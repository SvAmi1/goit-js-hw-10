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
        selectorEl.innerHTML = data.map(({id, name}) => `<option value='${id}'>${name}</option>`).join("");
        // loaderEl.style.display = 'block';
    })
    .catch(error => {console.log(error);
    // errorEl.style.display = 'block'
    Notify.failure('Oops! Something went wrong! Try reloading the page!')}
    )
}
makeSelectorOfCats();

function renderBreedList(data) {
    const breed = data.breeds[0];

    const murkup = `
      <img class="cat-img" src="${data.url}" alt="${breed.name}" width="400">
      <h1>${breed.name}</h1>
      <p>${breed.description}</p>
      <h2>Temperament: ${breed.temperament}</h2>
    `;
    infoBox.innerHTML = murkup;
}

function addBreedInfo() {
    loaderIsActive();
      
    fetchCatByBreed(selectorEl.value)
    .then(data => renderBreedList(data))
    .catch(error => {console.log(error);
        // errorEl.style.display = 'block',
    Notify.failure('Oops! Something went wrong! Try reloading the page!')}
    )
}

function loaderIsActive() {
    Loading.dots('Loading data, please wait...', {
        backgroundColor:'rgba(0,0,0,0.8)',
        });
    Loading.remove(1000);
}

selectorEl.addEventListener('change', addBreedInfo);

