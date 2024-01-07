var date = new Date();
export function todaysDate() {
    var day = date.getDate().toString().padStart(2, "0");
    var month = date.getMonth() + 1;
    var monthc = month.toString().padStart(2, "0");
    var year = date.getFullYear();
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
