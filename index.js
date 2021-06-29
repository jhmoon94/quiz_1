
const express = require('express');
const app = express();

const methodOverride = require('method-override')

const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
 

const path = require('path')
app.use(express.static(path.join('/',  __dirname, 'public')));


const logger = require('morgan')


app.use(logger('dev'))

app.use(express.urlencoded({extended: true}));

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method){
        const method = req.body._method;
        return method;
    }
}));

app.use((req, res, next) => {
    const username = req.cookies.username;
    
    res.locals.username = ''
    if(username) {
        res.locals.username = username;
        console.log(`Signed as ${username}`)
    }
    next();
})


app.set('view engine', 'ejs');

app.set('views', './views')


app.get('/', (req, res) => {
    res.render('welcome')
})


app.post('/sign_in', (req, res) => {

    const COOKIE_MAX_AGE = 200000;
    const username = req.body.username;
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/')
})
app.post('/sign_out', (req, res) => {

    const COOKIE_MAX_AGE = 200000;
    const username = req.body.username;
    res.clearCookie('username')
    res.redirect('/')
})

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter)


const PORT = 3000;
const DOMAIN = "localhost"; 

app.listen(PORT, DOMAIN, ()=>{
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
});

