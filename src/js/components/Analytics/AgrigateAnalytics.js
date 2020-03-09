import LocalStorage from '../../modules/LocalStorageApi';

export default class AgrigateAnalytics {
    constructor() {
        this.localStorage = new LocalStorage();
    }

    getTotalResults() {
        return this.localStorage.getData('cardsArray').totalResults;
    }

    getAgrigateData() {
        const agrigateData = {};

        const data = this.localStorage.getData('cardsArray');
        const requestText = this.localStorage.getData('requestText');

        if (data != null) {
            data.articles.forEach(item => {
                const day = new Date(item.publishedAt);
                
                switch (day.getDay()) {
                    case 1:
                        if (this._isUndefined(agrigateData.monday)) {
                            agrigateData.monday = { title: 0, description: 0 }
                        }

                        agrigateData.monday = this._agrigateDay(agrigateData.monday, item, requestText);
                        agrigateData.monday.date = item.publishedAt;

                        break;

                    case 2:                    
                        if (this._isUndefined(agrigateData.tuesday)) {
                            agrigateData.tuesday = { title: 0, description: 0 }
                        }

                        agrigateData.tuesday = this._agrigateDay(agrigateData.tuesday, item, requestText);
                        agrigateData.tuesday.date = item.publishedAt;
                        break;

                    case 3:
                        if (this._isUndefined(agrigateData.wednesday)) {
                            agrigateData.wednesday = { title: 0, description: 0 }
                        }

                        agrigateData.wednesday = this._agrigateDay(agrigateData.wednesday, item, requestText);
                        agrigateData.wednesday.date = item.publishedAt;
                        break;

                    case 4:
                        if (this._isUndefined(agrigateData.thursday)) {
                            agrigateData.thursday = { title: 0, description: 0 }
                        }

                        agrigateData.thursday = this._agrigateDay(agrigateData.thursday, item, requestText);
                        agrigateData.thursday.date = item.publishedAt;
                        break;

                    case 5:
                        if (this._isUndefined(agrigateData.friday)) {
                            agrigateData.friday = { title: 0, description: 0 }
                        }

                        agrigateData.friday = this._agrigateDay(agrigateData.friday, item, requestText);
                        agrigateData.friday.date = item.publishedAt;
                        break;

                    case 6:
                        if (this._isUndefined(agrigateData.saturday)) {
                            agrigateData.saturday = { title: 0, description: 0 }
                        }

                        agrigateData.saturday = this._agrigateDay(agrigateData.saturday, item, requestText);
                        agrigateData.saturday.date = item.publishedAt;
                        break;

                    case 0:
                        if (this._isUndefined(agrigateData.sunday)) {
                            agrigateData.sunday = { title: 0, description: 0 }
                        }

                        agrigateData.sunday = this._agrigateDay(agrigateData.sunday, item, requestText);
                        agrigateData.sunday.date = item.publishedAt;
                        break;
                }
            });
        }

        agrigateData.totalTitle = this._getTotal(agrigateData, 'title');
        agrigateData.totalDescription = this._getTotal(agrigateData, 'description');
        agrigateData.total = agrigateData.totalTitle + agrigateData.totalDescription;

        this._calculationPercent(agrigateData);
        return agrigateData;
    }

    _isUndefined(obj) {
        return obj === undefined;
    }

    _agrigateDay(day, dayData, text) {

        const title = day.title + this._textRequestCount(text, dayData.title);
        const description = day.description + this._textRequestCount(text, dayData.description);
        const total = title + description;

        return {
            title: title,
            description: description,
            total: total
        }
    }

    _textRequestCount(subString, text) {
        
        let count = 0;

        if (text != null) {        
            let regExp = new RegExp(subString.toLowerCase(), 'g');
            count = [...text.toLowerCase().matchAll(regExp)].length;            
        }

        return count;
    }

    _getTotal(week, type) {

        let count = 0;
        const badkey = ['totalTitle', 'totalDescription', 'total']

        Object.keys(week).forEach(day => {

            if (badkey.indexOf(day) == -1) {   
                count += week[day][type];   
            }
        });

        return count;
    }

    _calculationPercent(week) {
        
        const badkey = ['totalTitle', 'totalDescription', 'total']

        Object.keys(week).forEach(day => {
            if (badkey.indexOf(day) == -1) {   

                const totalDay = week[day].total;
                week[day].percent = totalDay == 0 ? 0 :  Math.trunc((totalDay / week.total) * 100), day;
            }
        });
    }
} 