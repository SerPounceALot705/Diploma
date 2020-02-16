import '../css/analytics.css';
import DrawAnalytics from './utils/DrawAnalytics';
import AgrigateAnalytics from './components/AgrigateAnalytics';
import LocalStorageApi from './modules/LocalStorageApi';

const drawAnalytics = new DrawAnalytics();
const agrigateAnalytics = new AgrigateAnalytics();
const localStorage = new LocalStorageApi();

const totalResults = agrigateAnalytics.getTotalResults();
const agrigate = agrigateAnalytics.getAgrigateData();

drawAnalytics.drawText(document.querySelector('#total-results'), totalResults);
drawAnalytics.drawText(document.querySelector('#total-mention'), agrigate.totalTitle);
drawAnalytics.drawText(document.querySelector('.statistics__title'), `Вы спросили: «${localStorage.getData("requestText")}»`)
drawAnalytics.drawText(document.querySelector('.analytics-by-day__date'), new Date().toLocaleString('ru', {month : 'long'}))
drawAnalytics.drawProcentWeek(agrigate);