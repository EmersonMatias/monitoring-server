var date = new Date();
export function todaysDate() {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var todaysDate = {
        day: day,
        month: month,
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
