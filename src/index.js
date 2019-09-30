const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
// const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
// const API = 'https://swapi.co/api/people';

localStorage.removeItem('next_fetch');

const getData = async api => {
  try {
    intersectionObserver.unobserve($observe);
    const request = await fetch(api);
    const data = await request.json();
  
    const characters = data.results;
    let output = characters.map(character => {
      return `
        <article class="Card">
          <img src="${character.image}" />
          <h2>${character.name}<span>${character.species}</span></h2>
        </article>
      `
    }).join('');
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
    localStorage.setItem('next_fetch', data.info.next);
    // console.log('loaded :)');
    intersectionObserver.observe($observe);
  } catch (error) {
    console.log(error);
  }
}

const end = () => {
  let output = `
  <article class="Card">
    <h2>No hay más personajes!</h2>
  </article>
  `
  let lastItem = document.createElement('section');
  lastItem.classList.add('FinalItems');
  lastItem.innerHTML = output;
  $app.appendChild(lastItem);
  intersectionObserver.unobserve($observe);
}

const loadData = () => {
  const storageURL = localStorage.getItem('next_fetch');
  // console.log('storageURL--->',storageURL);
  
  const URL = storageURL?storageURL:(storageURL===null?API:'');
  // console.log('URL',URL);

  !URL?end():getData(URL);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);