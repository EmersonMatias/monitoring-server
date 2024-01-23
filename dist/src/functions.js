var date = new Date();
export function todaysDate() {
    var day = date.getUTCDate().toString().padStart(2, "0");
    var month = date.getUTCMonth() + 1;
    var monthc = month.toString().padStart(2, "0");
    var year = date.getUTCFullYear();
    var todaysDate = {
        day: day,
        monthc: monthc,
        year: year
    };
    return todaysDate;
}
export function currentTime() {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var currentTime = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
    return currentTime;
}
export function dateTime() {
    var currentDateTime = new Date().toLocaleString("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        hour12: false, // Formato de 24 horas
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: "long"
    });
    var dayOfWeek = currentDateTime.split(", ")[0];
    var date = currentDateTime.split(", ")[1];
    var day = date.split("/")[0];
    var month = date.split("/")[1];
    var year = date.split("/")[2];
    var time = currentDateTime.split(", ")[2];
    var hour = time.split(":")[0];
    var minute = time.split(":")[1];
    var seconds = time.split(":")[2];
    return { day: day, month: month, year: year, hour: hour, minute: minute, seconds: seconds, date: date, time: time, dayOfWeek: dayOfWeek, currentDateTime: currentDateTime };
}
export function vacation() {
    var feriados = [
        {
            "date": "13/02/2024",
            "name": "Carnaval",
            "type": "national"
        },
        {
            "date": "29/03/2024",
            "name": "Sexta-feira Santa",
            "type": "national"
        },
        {
            "date": "31/03/2024",
            "name": "Páscoa",
            "type": "national"
        },
        {
            "date": "21/04/2024",
            "name": "Tiradentes",
            "type": "national"
        },
        {
            "date": "01/05/2024",
            "name": "Dia do trabalho",
            "type": "national"
        },
        {
            "date": "30/05/2024",
            "name": "Corpus Christi",
            "type": "national"
        },
        {
            "date": "07/09/2024",
            "name": "Independência do Brasil",
            "type": "national"
        },
        {
            "date": "12/10/2024",
            "name": "Nossa Senhora Aparecida",
            "type": "national"
        },
        {
            "date": "02/11/2024",
            "name": "Finados",
            "type": "national"
        },
        {
            "date": "15/11/2024",
            "name": "Proclamação da República",
            "type": "national"
        },
        {
            "date": "25/12/2024",
            "name": "Natal",
            "type": "national"
        },
        {
            "date": "10/01/2024",
            "name": "Natal",
            "type": "national"
        }
    ];
    return feriados;
}
