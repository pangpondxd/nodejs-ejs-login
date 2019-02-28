var express = require('express')
var app = express()

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/fruit', function(req, res){
   res.render('fruit', {fruits: ['banana', 'apple'] , foo: 'bar'})
})

app.get('/computer', function(req ,res) {
    res.render('computer', {computers: ['Windows','OSX','Android','IOS']})
})
app.listen(8000)

app.use(express.static(__dirname + '/public/images'))