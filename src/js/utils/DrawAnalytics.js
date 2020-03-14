export default class DrawAnalytics {
    constructor() { }

    drawText(container, text) {
        container.textContent = text;
    }

    drawProcentWeek(week) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

        days.forEach(day => {
            const container = document.querySelector(`#${day}`);
            const containerDay = document.querySelector(`#${day}-day`);

            if (week[day] != undefined) {
                container.textContent = week[day].percent;
                container.style.width = `${week[day].percent}%`;

                const date = new Date(week[day].date);
                const weekday = date.toLocaleString("ru", { weekday: 'short' }).toUpperCase()

                containerDay.textContent = `${date.getDate()}, ${weekday}`;
            } else {
                container.remove();
                containerDay.remove();   
            }
        });
    }
}