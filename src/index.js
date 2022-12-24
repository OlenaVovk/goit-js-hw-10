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
 return fetchCountries(inputEl.value).then(data => {
    
    if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        listEl.innerHTML = '';
        divEl.innerHTML = '';
        return;
    }
    if (data.length > 1 && data.length < 10) {
        renderCountries(data);
    }
    if (data.length === 1) {
        renderCountry(...data);
    }
    if (data.length === 0) {
        
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
    .catch(error => {
        console.log(error);
        Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}

function renderCountry({name, capital, population, flags, languages}) {
    listEl.innerHTML = '';
    divEl.innerHTML = `<img src="${flags.svg}" alt="flat" width="20px"/>
                    <h2>${name.official}</h2>
                    <p>Capital: ${capital}</p>
                    <p>Population: ${population}</p>
                    <p>Languages: ${Object.values(languages)}</p>`;
}

function renderCountries(data) {
    listEl.innerHTML = data.map(item => (`<li><img src="${item.flags.svg}" alt="flat" width="20px"/><span>${item.name.official}</span></li>`)).join(''); 
    divEl.innerHTML = '';
}
