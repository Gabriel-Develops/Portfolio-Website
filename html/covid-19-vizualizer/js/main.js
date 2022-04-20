let API_MINIMUM_DATE = 20200113, API_MAXIMUM_DATE = 20210307

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
    const date = document.querySelector('input').value
    // Check for valid input
    // Converts date into number and compares against min and max given in api data
    if (+date.split('-').join('') < API_MINIMUM_DATE || +date.split('-').join('') > API_MAXIMUM_DATE)
        console.error('Date is not in range of available covid-19 data')

    const url = `https://api.covidtracking.com/v2/us/daily/${date}.json`

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        // Total Section, Testing Section, Mortality Section
        // Total Section
        console.log('Total Cases:', data.data.cases.total.value)

        // Testing Section
        console.log('Total Tests', data.data.testing.total.value)

        // Mortality Section
        console.log('Total in hospitals', data.data.outcomes.hospitalized.currently.value)
        console.log('Currently in ICU', data.data.outcomes.hospitalized.in_icu.currently.value)
        console.log('On Ventilator', data.data.outcomes.hospitalized.on_ventilator.currently.value)

        console.log('Dead', data.data.outcomes.death.total.value)
    })
    .catch(err => {
        console.log(`error ${err}`)
});
}

