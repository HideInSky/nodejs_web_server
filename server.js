const path = require('path');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500

// built-in middleware
app.use(express.urlencoded( { extended: false}))

app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, '/public')))


app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?  ', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page')
    // redirect === app.get('./new-page.html')
})

// Route handler +++, function chain
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}, (req, res) => {
    res.send('HelloWorld!')
})

// chaining route handlers
 const one = (req, res, next) =>{
    console.log('one')
    next()
 }
 const two = (req, res, next) => {
    console.log('two')
    // res.send('Finish - 2')
    next()
 }
 const three = (req, res, next) =>{
    console.log('three')
    res.send('Finish - 3')
 }

 app.get('/hi', [one, two, three])
 
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));