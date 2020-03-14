import '../css/index.css';

import SearchInput from './components/searchingResults/SearchInput';
import Validate from './utils/Validate';
import Draw from './utils/DrawContainers';

const input = document.querySelector('.header__input');
const validity = new Validate(input);
const search = new SearchInput();

input.addEventListener('focus', () => validity.isValid());
input.addEventListener('input', () => validity.isValid());

Draw.applyIndex(document.querySelector('.search-box'));

document.querySelector('.header__container-search-string').addEventListener('submit', event => search.getNews(event));   