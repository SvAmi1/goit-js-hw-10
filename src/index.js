import './main.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const infoBox = document.querySelector('.cat-info');
// const loaderEl = document.querySelector('.loader');
const selectorEl = document.querySelector('.breed-select');
// const errorEl = document.querySelector('.error');


function makeSelectorOfCats() {
    loaderIsActive();
    fetchBreeds()
    .then((data) => { 
        selectorEl.innerHTML = data.map(({id, name}) => `<option value = '${id}'>${name}</option>`).join("");
        // loaderEl.style.display = 'block';
    })
    .catch((err) => Notify.failure('Oops! Something went wrong! Try reloading the page!'),)
}
makeSelectorOfCats();

function renderBreedList(data) {
    const breed = data.breeds[0];
    const markup = `
      <img src="${breed.url}" alt="${breed[0].name} height="600" width="500" ">
      <h1>${breed[0].name}</h1>
      <p>${breed[0].description}</p>
      <h2>Temperament: ${breed[0].temperament}</h2>`;
      infoBox.innerHTML = markup;
}

function addBreedInfo() {
    // loaderIsActive();
    fetchCatByBreed(selectorEl.value)
    .then((data) => {
        infoBox.style.display = 'block';
        renderBreedList(data)})
    .catch((err) => Notify.failure('Oops! Something went wrong! Try reloading the page!'),)
}

function loaderIsActive() {
    Loading.dots('Loading data, please wait...', {
        backgroundColor: 'rgba(0,0,0,0.8)',
        });
    Loading.remove(1000);
}

selectorEl.addEventListener('change', addBreedInfo());

