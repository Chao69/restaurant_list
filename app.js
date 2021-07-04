const { SlowBuffer } = require('buffer')
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// render all restaurant
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurants.results })
})

// render restaurant description after clicked
app.get('/restaurants/:id', (req, res) => {
  restaurant = restaurants.results.filter(restaurant => restaurant.id == req.params.id)
  res.render('show', { restaurant: restaurant[0] })
})

// render restaurants that user search
app.get('/search', (req, res) => {
  const restaurantMatch = restaurants.results.filter(restaurant => restaurant.name.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase()))
  res.render('index', { restaurantList: restaurantMatch })
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
