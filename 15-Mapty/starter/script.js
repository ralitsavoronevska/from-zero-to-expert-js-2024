'use strict';

// Using the Geolocation API

// The Geolocation API is called an API, because it is in fact a browser API, just like, for example,
// internalization, or timers, or really anything, that a browser gives us. And so, Geolocation is
// just another API like that, but it's also a very modern one. And actually, there are many other
// modern APIs like that. For example, to access the user's camera or even to make user's phone vibrant.
// So, there is all kinds of crazy stuff that you can do, but in this Project let's simply focus on Geolocation.

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    // this.type = 'running';
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const running1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(running1, cycling1);

/////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // Private Instance Properties
  // So, Properties that are going to be present on all the Instances created through this Class.
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get User's position
    this._getPosition();
    // Get Data from localStorage
    this._getLocalStorage();
    // Attach Event Handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this));
  }
  _getPosition() {
    // And Geolocation is actually very very easy to use.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Couldn't get you position.");
        }
      );
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling Clicks on Map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    // Empty Inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault();

    // And remember, when we use REST parameters, like this, we get an Array.
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    // Get Data from the Form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If Workout Running, then create a Running Object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if Data is valid
      // And here we will actually use a Guard Clause.
      // So, again what a Guard Clause means is that we will basically check for the opposite of
      // what we are originally interested in, and if that opposite is true, we simply return
      // the Function, immediately. And so, once again, this is a trade of more Modern JS.
      // So, a kind of trend that you will see in Modern JS.
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be posittive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If Workout Cycling, then create a Cycling Object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if Data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be posittive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Add new Object to the Workout Array
    this.#workouts.push(workout);

    // Render Workout on the Map as a Marker
    this._renderWorkoutMarker(workout);

    // Render Workout on the List
    this._renderWorkout(workout);

    // Hide the Form + Clear Input Fields
    this._hideForm();

    // Set localStorage to all workouts
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;
    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }
    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopUp(e) {
    const workoutEl = e.target.closest('.workout');
    console.log(workoutEl);
    // Guard Clause
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // Using the Public Interface
    // workout.click();
  }
  _setLocalStorage() {
    // So, basically, localStorage is a simple key value store, and so we need a key, which is this one here,
    // and we need a simple value , which much also be a String. But we can convert an Object to a String, by doing this:
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    // I just want to mention that localStorage is a very simple API. And so, it is only advised to use for small amounts of Data.
    // That's because localStorage is blocking and for now you don't know what blocking actually means, but it's something that is
    // really bad and we will learn why that is actually in the next Section. But for now, what matters here is that you shouldn't
    // use localStorage to store large amounts of Data, because that will surely slow down your Application.
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);

    // Guard Clause
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
    // And location is basically a big Object that contains a lot of Methods and Properties in the browser.
    // And so, one of the Methods is the ability to reload the page.
  }
}

const app = new App();

// Displaying a Map Using Leaflet Library
// In this video we are going to learn how to display a Map using a 3rd Party Library called "Leaflet".

// Displaying a Map Marker
// So, nin this video we are going to display a Map Marker wherever we click on the Map.
// And for that we are going to use, one more time, the Leaflet Library.

// Rendering Workout Input Form
// So, let's now render the Workout Input Form whenever the user clicks on the Map.

// Project Architecture
// So, before we continue any further in our Project, we should now think a little bit about our Project Architecture.

// So, to start, one of the most important aspects of any Architecture is to decide "Where" and "How" to store the Data.
// Because the Data is probably the most fundamental part of any Application. Because without Data is doen't even make sense
// to have an Application in the first place. What will the Application be about if NOT about some sort of Data?

// Now, in this case the Data that we need to store and to manage comes directly from the User Stories.
// And so, we will design our Classes so that they can create Objects that will hold thiis kind of Data.
// And I believe that this is the best way of designing the Classes to really fit our User Stories.

// And so, with this structure here, we have everything that is related to building the Application itself,
// organized into 1 block of Data and Functionality. And actually, having a Class that contains all the
// Data and Methods about the Application, like we have here, is a pretty common thihng that you will see in
// simple JS Applications like this one. Now, if the Application was a bit more complex, then we could divide this
// Architecture even further and create 1 Class that will only be concerned with the User Interface and 1 Class
// for the so called "Business Logic". So, basically, the Logic that works only with the underlying Data.

// But in this case we can just keep it simple like this. And so, as I mentioned before, this Architecture will
// then allows us to have everything that is about the Application in 1 nice selfcontained block.
// And, besided the Application itself, we then also have these Classes that are only conserted about the Data.
// And so, therefore, Application and Data will be nicely separated in a very logical way I believe.
// Now, what's also great about this is that we will be able to protect all of these Methods so that they are nicely
// encapsulated and NOT accesible from everywhere else in the code.

// Refactoring for Project Architecture
// Let's now implement the Architecture that we just discussed in the previous lecture.

// Managing Workout Data: Creating Classes
// So, in this video we are going to implement Classes to mkanage the Data about our Cycling and Running Workouts
// that are coming from the User Interface.

// Creating a new Workout
// So, using the Workout Classes that we just implemented, let's now finally implement the feature of creating a new Workout
// from our Interface.

// Rendering Workouts
// So, let's now render new workouts in the Sidebar of our User Interface.
// And so, what I mean with rendering is to basically create a list item like this for each Workout.

// Move to Marker on Click
// In this lecture, we are going to implement a feature that will basically move the Map to the position of the Workout
// that wa clikced on the Sidebar.

// Working with localStorage
// Let's now use the localStorage API in order to make the Workout Data persist across multiple page reloads.

// So, basically the idea is that whenever a new Workout is added, then all of the Workouts will be added to localStorage.
// And so, localStorage is basically a place in the browser where we ca store Data that will stay there even after we close the page.
// So, basically the Data is basically linked to the URL on which we are using the Application.
// So, whenever there is a new Workout, we will take the entire Workouts Array and store it in the localStorage.
// And then, whenever the page loads, we will load all the Workouts from the localStorage and render them on the Map
// and also on the List. So, just like we do it when the User submits a new Workout. And so like this, when you relaod the page,
// it will then apperat as if all the Workouts you had previously are still in the same place.
