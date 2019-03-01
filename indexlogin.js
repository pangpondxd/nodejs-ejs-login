var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extend: false})
app.use(urlencodedParser)
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000}, resave : false, saveUninitialized:false}))
app.get('/', function(req, res) {
   res.render('index')
  
})
app.post('/admin', function(req, res, next) {
    var sess = req.session
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    if (sess.views) {
        sess.views++
    } else {
        sess.views = 1
    }
    if (!password) {
        res.redirect('/');
    }

    if (Number(password) !== 240311) {
        sess.isAuth = false;
        res.render('admin', { 
            isAuth: sess.isAuth, 
            text: 'Plase login First',
            url: '/',
            textButton: 'login'})
    }
    
    sess.email = email;
    res.render('admin', {
        isAuth: sess.isAuth,
        text: `Hello ${email}`,
        url: '/',
        textButton: 'logout'
    })
})

app.get('/admin', function(req, res) {
    var sess = req.session
    var email = sess.email
    if(!sess.isAuth) {
        res.render('admin', { 
            isAuth: sess.isAuth, 
            text: 'Plase login First',
            url: '/',
            textButton: 'login'})
    } else if (sess.isAuth) {
        res.render('admin', {
            isAuth: sess.isAuth,
            text: `Hello ${email}`,
            url: '/',
            textButton: 'logout'
        })
    }
});

app.get('/logout', function(req, res) {
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/login')
        }  
    });  
})

app.use(express.static(__dirname + '/assets'))
app.listen(8000)