import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import * as API from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput () {
 //console.log('value:',inputEl.value);
 const country = inputEl.value.trim();
 //console.log('country:', country);
 if (!country){
    clearString();
    return;
 }

 return API.fetchCountries(country)
    .then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            clearString();
        }
        if (data.length > 1 && data.length <= 10) {
            renderCountries(data);
        }
        if (data.length === 1) {
            renderCountry(...data);  
        }    
    })
    .catch(err => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        clearString();
    })
}

function renderCountry({name, capital, population, flags, languages}) {
    listEl.innerHTML = '';
    listEl.setAttribute('hidden', true);
    divEl.innerHTML = `<img src="${flags.svg}" alt="flat" width="20px"/><h2>${name.official}</h2>
                    <p><b>Capital:</b> ${capital}</p>
                    <p><b>Population:</b> ${population}</p>
                    <p><b>Languages:</b> ${Object.values(languages)}</p>`;
}

function renderCountries(data) {
    listEl.removeAttribute('hidden');
    listEl.innerHTML = data.map(item => (`<li><img src="${item.flags.svg}" alt="flat" width="20px"/><span>${item.name.official}</span></li>`)).join(''); 
    divEl.innerHTML = '';
}

function clearString () {
    listEl.innerHTML = '';
    divEl.innerHTML = '';
}
