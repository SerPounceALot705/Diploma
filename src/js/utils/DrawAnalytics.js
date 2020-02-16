import { data } from "flickity";

export default class DrawAnalytics {
    constructor() { }

    drawText(container, text) {
        container.textContent = text;
    }

    drawProcentWeek(week) {
        const badkey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

        badkey.forEach(day => {
            const contaioner = document.querySelector(`#${day}`);
            const contaionerDay = document.querySelector(`#${day}-day`);

            if (week[day] != undefined) {
                contaioner.textContent = week[day].percent;
                contaioner.style.width = `${week[day].percent}%`;

                const date = new Date(week[day].date);
                const weekday = date.toLocaleString("ru", { weekday: 'short' }).toUpperCase()

                contaionerDay.textContent = `${date.getDate()}, ${weekday}`;
            } else {
                contaioner.remove();
                contaionerDay.remove();
                
            }

        });
    }
}