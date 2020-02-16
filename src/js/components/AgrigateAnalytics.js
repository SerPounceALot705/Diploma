import LocalStorage from '../modules/LocalStorageApi';

export default class AgrigateAnalytics {
    constructor() {
        this.localStorage = new LocalStorage();
        console.log(this.localStorage.getData('cardsArray'));
    }

    getTotalResults() {
        return this.localStorage.getData('cardsArray').totalResults;
    }

    getAgrigateData() {
        let agrigateData = {};

        const data = this.localStorage.getData('cardsArray');
        const requestText = this.localStorage.getData('requestText');

        if (data != null) {
            data.articles.forEach(item => {
                const day = new Date(item.publishedAt);
                
                switch (day.getDay()) {
                    case 0:

                        if (this.isUndefined(agrigateData.monday)) {
                            agrigateData.monday = { title: 0, description: 0 }
                        }

                        agrigateData.monday = this.agrigateDay(agrigateData.monday, item, requestText);
                        agrigateData.monday.date = item.publishedAt;

                        break;

                    case 1:
                        if (this.isUndefined(agrigateData.tuesday)) {
                            agrigateData.tuesday = { title: 0, description: 0 }
                        }

                        agrigateData.tuesday = this.agrigateDay(agrigateData.tuesday, item, requestText);
                        agrigateData.tuesday.date = item.publishedAt;
                        break;

                    case 2:
                        if (this.isUndefined(agrigateData.wednesday)) {
                            agrigateData.wednesday = { title: 0, description: 0 }
                        }

                        agrigateData.wednesday = this.agrigateDay(agrigateData.wednesday, item, requestText);
                        agrigateData.wednesday.date = item.publishedAt;
                        break;

                    case 3:
                        if (this.isUndefined(agrigateData.thursday)) {
                            agrigateData.thursday = { title: 0, description: 0 }
                        }

                        agrigateData.thursday = this.agrigateDay(agrigateData.thursday, item, requestText);
                        agrigateData.thursday.date = item.publishedAt;
                        break;

                    case 4:
                        if (this.isUndefined(agrigateData.friday)) {
                            agrigateData.friday = { title: 0, description: 0 }
                        }

                        agrigateData.friday = this.agrigateDay(agrigateData.friday, item, requestText);
                        agrigateData.friday.date = item.publishedAt;
                        break;

                    case 5:
                        if (this.isUndefined(agrigateData.saturday)) {
                            agrigateData.saturday = { title: 0, description: 0 }
                        }

                        agrigateData.saturday = this.agrigateDay(agrigateData.saturday, item, requestText);
                        agrigateData.saturday.date = item.publishedAt;
                        break;

                    case 6:
                        if (this.isUndefined(agrigateData.sunday)) {
                            agrigateData.sunday = { title: 0, description: 0 }
                        }

                        agrigateData.sunday = this.agrigateDay(agrigateData.sunday, item, requestText);
                        agrigateData.sunday.date = item.publishedAt;
                        break;
                }
            });
        }

        agrigateData.totalTitle = this.getTotal(agrigateData, 'title');
        agrigateData.totalDescription = this.getTotal(agrigateData, 'description');
        agrigateData.total = agrigateData.totalTitle + agrigateData.totalDescription;

        this.calculationPercent(agrigateData);
        
        return agrigateData;
    }

    isUndefined(obj) {
        return obj === undefined;
    }

    agrigateDay(day, dayData, text) {

        const title = day.title + this.textRequestCount(text, dayData.title);
        const description = day.description + this.textRequestCount(text, dayData.description);
        const total = title + description;

        return {
            title: title,
            description: description,
            total: total
        }
    }

    textRequestCount(subString, text) {
        
        let count = 0;

        if (text != null) {        
            let regExp = new RegExp(subString.toLowerCase(), 'g');
            count = [...text.toLowerCase().matchAll(regExp)].length;            
        }

        return count;
    }

    getTotal(week, type) {

        let count = 0;
        const badkey = ['totalTitle', 'totalDescription', 'total']

        Object.keys(week).forEach(day => {

            if (badkey.indexOf(day) == -1) {   
                count += week[day][type];   
            }
        });

        return count;
    }

    calculationPercent(week) {
        
        const badkey = ['totalTitle', 'totalDescription', 'total']

        Object.keys(week).forEach(day => {
            if (badkey.indexOf(day) == -1) {   

                const totalDay = week[day].total;
                week[day].percent = Math.trunc((totalDay / week.total) * 100), day;
            }
        });
    }
} 