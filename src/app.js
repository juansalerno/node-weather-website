const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs') // setting up handlebars, por defecto express busca la carpeta views en el root directory
app.set('views', viewsPath) // setting up express to look for the views in an specific directory
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // customize server


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Juan Ignacio Salerno'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Juan Ignacio Salerno'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Juan Ignacio Salerno',
        helpMsg: 'This is some help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { location, longitude, latitude } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 handlers
// Specific:
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juan Ignacio Salerno',
        msg404: 'Help article not found'
    })
})

// Generic
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juan Ignacio Salerno',
        msg404: 'Page not found'
    }) // MUST be at the end, so matches things that has not matched before
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})