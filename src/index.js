const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
// const API = 'https://rickandmortyapi.com/api/character/';
// const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
const API = 'https://swapi.co/api/people';

localStorage.removeItem('next_fetch');

const getData = async api => {
  try {
    const request = await fetch(api);
    const data = await request.json();
  
    const characters = data.results;
    let output = characters.map(character => {
      // <img src="${character.image}" />
    return `
    <article class="Card">
      <h2>${character.name}<span>${character.eye_color}</span></h2>
    </article>
    `
    }).join('');
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
    localStorage.setItem('next_fetch', data.next);
  } catch (error) {
    console.log(error);
  }
}

const loadData = () => {
  const storageURL = localStorage.getItem('next_fetch');
  console.log('storageURL--->',storageURL);
  
  const URL = storageURL?storageURL:API;
  console.log('URL',URL);

  (!URL||URL==='null')?console.log('Fin'):getData(URL);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);