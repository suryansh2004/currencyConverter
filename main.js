const apiKey = '3f047afd1dafd5e4b786b899'
const currencies = ['EUR', 'AED', 'GBP', 'INR', 'KWD']
const source = 'USD'

console.log('MADE BY - SURYANSH PRIYADRASHI')

const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${source}`
const exchangeRates = {}
const time = new Date()

function calcTime(extra = 0) {
    let hours = time.getHours() - 12
    let minutes = time.getMinutes()
    if ((extra != 0) & (time.getMinutes() > 55)) {
        hours++
        minutes += extra - 60
    } else {
        minutes += extra
    }
    return `${Math.abs(hours).toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
}

const myStorage = localStorage.getItem('exchangeRates')
if (myStorage) {
    exchangeRates[0] = JSON.parse(myStorage)[0]
    console.log(calcTime(), '-- Imported Data!!!')
} else {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            exchangeRates[0] = {
                USDEUR: data['conversion_rates']['EUR'],
                USDAED: data['conversion_rates']['AED'],
                USDGBP: data['conversion_rates']['GBP'],
                USDINR: data['conversion_rates']['INR'],
                USDKWD: data['conversion_rates']['KWD'],
            }
            localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates))
        })
    console.log(calcTime(), '-- Refreshed Data!!!')
}

function onRefreshClick() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            exchangeRates[0] = {
                USDEUR: data['conversion_rates']['EUR'],
                USDAED: data['conversion_rates']['AED'],
                USDGBP: data['conversion_rates']['GBP'],
                USDINR: data['conversion_rates']['INR'],
                USDKWD: data['conversion_rates']['KWD'],
            }
            localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates))
        })
    console.log(calcTime(), '-- Refreshed Data!!!')
}

const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const changeFrom = document.getElementById('from')
const changeTo = document.getElementById('to')
const refresh = document.getElementById('refreshBtn')

function getSelection() {
    return [changeFrom.value.toUpperCase(), changeTo.value.toUpperCase()]
}

input1.addEventListener('change', (e) => {
    const value = e.target.value
    const [FROM, TO] = getSelection()
    if (FROM === 'USD') {
        input2.value = (exchangeRates[0][FROM + TO] * value).toFixed(2)
    } else if (TO === 'USD') {
        input2.value = (exchangeRates[0][TO + FROM] * value).toFixed(2)
    } else {
        input2.value = (
            (exchangeRates[0]['USD' + TO] / exchangeRates[0]['USD' + FROM]) *
            value
        ).toFixed(2)
    }
})

input2.addEventListener('change', (e) => {
    const value = e.target.value
    const [FROM, TO] = getSelection()
    if (FROM === 'USD') {
        input1.value = (value / exchangeRates[0][FROM + TO]).toFixed(2)
    } else if (TO === 'USD') {
        input1.value = (value / exchangeRates[0][TO + FROM]).toFixed(2)
    } else {
        input1.value = (
            (exchangeRates[0]['USD' + FROM] / exchangeRates[0]['USD' + TO]) *
            value
        ).toFixed(2)
    }
})

changeFrom.addEventListener('change', () => {
    input1.setAttribute('placeholder', changeFrom.value.toUpperCase())
    input2.dispatchEvent(new Event('change'))
})

changeTo.addEventListener('change', (e) => {
    input2.setAttribute('placeholder', changeTo.value.toUpperCase())
    input1.dispatchEvent(new Event('change'))
})

refresh.addEventListener('click', () => {
    onRefreshClick()
    if (!refresh.hasAttribute('disabled')) {
        refresh.textContent = `Refresh again at ${calcTime(5)}`
        refresh.toggleAttribute('disabled')
    }
    setTimeout(() => {
        if (refresh.hasAttribute('disabled')) {
            refresh.toggleAttribute('disabled')
            refresh.textContent = `Refresh Data`
        }
    }, 5 * 60 * 1000)
})
