import '../css/index.css';

import SearchInput from './components/Cards/SearchInput';
import Validate from './utils/Validate';
import DrawContainers from './utils/DrawContainers';

const input = document.querySelector('.header__input');
const validity = new Validate(input);

input.addEventListener('focus', () => validity.isValid());
input.addEventListener('input', () => validity.isValid());

const draw = new DrawContainers(document.querySelector('.search-box'));
draw.applyIndex();

document.forms.search.addEventListener('submit', event => new SearchInput().getNews(event));   

