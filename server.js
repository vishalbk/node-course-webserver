const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    var log = `${new Date().toString()}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    if (false) {
        res.render('maintenance.hbs', {
            pageTitle: "We'll be right back!",
            welcomeMessage: 'The website is under maintenance, we\'ll be back soon'
        })
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my Website'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio HQ',
        welcomeMessage: 'This page lists a comprehensive portfolio of all the projects completed'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.status(400);
    res.send({
        summary: 'Bad Request',
        description: 'This is a bad request, please try other path'
    })
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});