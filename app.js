const express = require('express')
const hdbars = require('express-handlebars')
const resturentsSrc = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', hdbars({defaultLayout:'main.handlebars'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.listen(port, ()=>{
    console.log('listening on port : ', port)
})


app.get('/',(req,res)=>{
    const restaurants = resturentsSrc.results
    console.log(restaurants)
    res.render('index', {restaurants})
})

app.get('/search',(req,res)=>{
    const {keyword} = req.query
    const restaurants = resturentsSrc.results.filter((restaurant)=>{
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', {restaurants, keyword})
})

app.get('/restaurants/:restaurantId',(req, res)=>{
    const {restaurantId} = req.params
    const restaurant = resturentsSrc.results.find((ele)=> `${ele.id}` === `${restaurantId}`)
    res.render('detail',{restaurant})
})