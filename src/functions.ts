const date = new Date()

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
    const day = Number(date.split("/")[0])
    const month = Number(date.split("/")[1])
    const year = Number(date.split("/")[2])

    const time = currentDateTime.split(", ")[2]
    const hour = Number(time.split(":")[0])
    const minute = Number(time.split(":")[1])
    const seconds = Number(time.split(":")[2])

    return { day, month, year, hour, minute, seconds, date, time, dayOfWeek, currentDateTime }
}

export function vacation() {
    const feriados = [
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

export function convertTimeToUTC(time: string) {
    const timeUTC = new Date('1971-01-01');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    timeUTC.setHours(hours);
    timeUTC.setMinutes(minutes);
    timeUTC.setSeconds(seconds);

    return timeUTC
}

export function convertDateToUTC(date: string) {
    const [day, month, year] = date.split('/').map(Number);

    const dateUTC = new Date(`${year}-${month}-${day}`);
    dateUTC.setUTCHours(0);
    dateUTC.setUTCMinutes(0);
    dateUTC.setUTCSeconds(0);

    return dateUTC
}

export function convertTimeToBrasilia(time?: Date) {
    const timeBrasilia = new Date(time).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return timeBrasilia
}

export function convertDateToBrasilia(date: Date){
    const [year, month, day] = date.toISOString().split('T')[0].split('-');

    const dateBrasilia = `${day}/${month}/${year}`;

    return dateBrasilia
}

export function convertTimestampToDateTime(timestamp: number){
    const dateTime = new Date(timestamp).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})

    return dateTime
}