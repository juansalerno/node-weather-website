const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const currentLocationButton = document.querySelector('.current-location-btn')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    search.value = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.innerHTML = data.forecast
            }
        })
    })
})

currentLocationButton.addEventListener('click', () => {
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    search.value = ''

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    
    navigator.geolocation.getCurrentPosition(({ coords }) => {
        fetch(`/weather/currentLocation?latitude=${coords.latitude}&longitude=${coords.longitude}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = 'In your current location:'
                    messageTwo.innerHTML = data.forecast
                }
            })
        })
    })
})

