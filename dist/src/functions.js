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
    });
    var date = currentDateTime.split(", ")[0];
    var day = date.split("/")[0];
    var month = date.split("/")[1];
    var year = date.split("/")[2];
    var time = currentDateTime.split(", ")[1];
    var hour = time.split(":")[0];
    var minute = time.split(":")[1];
    var seconds = time.split(":")[2];
    return { day: day, month: month, year: year, hour: hour, minute: minute, seconds: seconds, date: date, time: time };
}
