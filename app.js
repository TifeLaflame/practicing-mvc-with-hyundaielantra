
const modelData = {
  currentCar: null,
  hyundaiCars: [
    {
      name: 'Elantra 2015',
      imageSrc: './images/hyundai-elantra-2015.png',
      overview: 'The Elantra compact car is offered in sedan and GT hatchback body styles. It seats up to five people and primary competitors include the Honda Civic, Ford Focus and Chevrolet Cruze',
      price: '$6,289 — $14,421'
    },
    {
      name: 'Elantra 2016',
      imageSrc: './images/hyundai-elantra-2016.png',
      overview: 'The Elantra compact car is offered in sedan and GT hatchback body styles. It seats up to five people, and primary competitors include the Honda Civic, Toyota Corolla, Ford Focus and Chevrolet Cruze. All versions of the sedan except the Sport come with a 1.8-liter four-cylinder engine. The Sport and the GT hatchback use a 2.0-liter four-cylinder. Both engines are available with a six-speed manual or six-speed automatic transmission.',
      price: '$7,016 — $15,128',
      newFeatures: 'A new Value Edition sedan has 16-inch alloy wheels, a power sunroof, keyless entry with push-button start and heated front seats. The Limited sedan adds keyless entry with push-button start and automatic climate control.'
    }
  ]
}

// Controller 
const controller = {
  init() {
    modelData.currentCar = modelData.hyundaiCars[0];

    listView.init();
    carView.init();
  },

  getCurrentCar() {
    return modelData.currentCar;
  },

  getCars() {
    return modelData.hyundaiCars;
  },
  setCurrentCar(car) {
    modelData.currentCar = car;
  },
}

// Views
const carView = {
  init() {
      // store pointer to our DOM elements for easy access later
      this.carElem = document.getElementById('car');
      this.carNameElem = document.getElementById('car-name');
      this.carImageElem = document.getElementById('car-img');
      this.countElem = document.getElementById('car-count');

      // render this view (update the DOM elements with the right values)
      this.render();
  },

  render() {
      // update the DOM elements with values from the current car
      const currentCar = controller.getCurrentCar();
      this.carNameElem.textContent = currentCar.name;
      this.carImageElem.src = currentCar.imageSrc;
      this.carImageElem.style.cursor = 'pointer';
  },
};

const listView = {
  init() {
    this.carListElem = document.getElementById('car-list');
    this.render();
},

render() {
    let car;
    let elem;
    let i;
 
    const cars = controller.getCars();

    this.carListElem.innerHTML = '';

    // loop over the cars
    for(let i = 0; i < cars.length; i++) {
        // this is the car we've currently looping over
      car = cars[i];

      // make a new car list item and set its text
      elem = document.createElement('li');
      elem.className = 'list-group-item d-flex justify-content-between lh-condensed';
      elem.style.cursor = 'pointer';
      elem.textContent = car.name;
      elem.addEventListener('click', (function(carCopy) {
          return function() {
            controller.setCurrentCar(carCopy);
            carView.render();
          };
        })(car)
      );
            // finally, add the element to the list
      this.carListElem.appendChild(elem);
    }
  }
}

controller.init();