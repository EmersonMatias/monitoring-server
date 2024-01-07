const date = new Date()


export function todaysDate(){
    const day = date.getDate().toString().padStart(2, "0")
    const month = date.getMonth()+1
    const monthc = month.toString().padStart(2,"0")
    const year = date.getFullYear()

    const todaysDate = {
        day,monthc, year
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