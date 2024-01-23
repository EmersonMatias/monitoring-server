const date = new Date()


export function todaysDate() {
    const day = date.getUTCDate().toString().padStart(2, "0")
    const month = date.getUTCMonth() + 1
    const monthc = month.toString().padStart(2, "0")
    const year = date.getUTCFullYear()

    const todaysDate = {
        day, monthc, year
    }

    return todaysDate
}


export function currentTime() {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const currentTime = {
        hours, minutes, seconds
    }

    return currentTime
}

export function dateTime() {
    const currentDateTime = new Date().toLocaleString("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        hour12: false, // Formato de 24 horas
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: "long"
    })

    const dayOfWeek = currentDateTime.split(", ")[0]

    const date = currentDateTime.split(", ")[1]
    const day = date.split("/")[0]
    const month = date.split("/")[1]
    const year = date.split("/")[2]

    const time = currentDateTime.split(", ")[2]
    const hour = time.split(":")[0]
    const minute = time.split(":")[1]
    const seconds = time.split(":")[2]

    return { day, month, year, hour, minute, seconds, date, time,dayOfWeek,currentDateTime }
}

export function vacation() {
    const feriados =  [
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
    ]

    return feriados
   
}