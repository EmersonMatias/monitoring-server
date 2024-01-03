const date = new Date()


export function todaysDate(){
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()

    const todaysDate = {
        day,month, year
    }

    return todaysDate
}


export function currentTime(){
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const currentTime = {
        hours, minutes, seconds
    }

    return currentTime
}