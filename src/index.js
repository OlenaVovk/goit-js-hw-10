import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput () {
 console.log(inputEl.value);
  fetchCountries(inputEl.value).then(data => {
    console.log(data);
    if (data.length > 10) {
       console.log("Too many matches alert");  
    }
    if (data.length > 1 && data.length < 10) {
        renderCountries(data);
    }
    if (data.length === 1) {
        renderCountry(data);
    }
  })


}



function fetchCountries(name) {
   return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
    return response.json();
    })
    .catch(error => console.log("УУупс!", error))
}

function renderCountry(obj) {
 const {name, capital, population, flags, languages} = obj;
 divEl.innerHTML = `<img src="${flags.svg}" alt="flat"/>
                    <h2>${name.official}</h2>
                    <p>Capital: ${capital}</p>
                    <p>Population: ${population}</p>
                    <p>Languages: ${languages}</p>`;
}

function renderCountries(arr) {
 const markUp = arr.map(el => `<li><img src="${el.flags.svg}" alt="flat"/><span>${el.name.official}</span></li>`.join(''));
 listEl.innerHTML = markUp;
}