//Express 
const express = require('express');
const app = express();
const PORT = 3000;

//Handlebars
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') 


//Import our database and model
const {sequelize} = require('./db');
const {Sauce} = require('./models/index');


const seed = require('./seed')

//Set up our templating engine with handlebars
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars'); // To render template files, set the following application setting properties, set in app.js in the default app created by the generator:

//serve static assets from public folder
app.use(express.static('public')) //

//body parser so req.body is not undefined
app.use(require('body-parser').urlencoded());

//seed our database
seed();

//*************** ROUTES ******************//
app.get('/sauces', async (req, res) => {
    const sauces = await Sauce.findAll();
    res.render('sauces', {sauces}); //first param points to the sauces view in handlebars, second param is the data from the db
})

app.get('/sauces/:id', async (req, res) => {
    const sauce = await Sauce.findByPk(req.params.id);
    res.render('sauce', {sauce}); //sauce hb view
})

//New Routes go here: 


//serving is now listening to PORT
app.listen(PORT, () => {
    console.log(`Your server is now listening to port ${PORT}`)
})