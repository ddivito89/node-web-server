const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

//middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
        console.log('unable to append file');
    }
  });
  next();
});

// //maintenance error middleware KEEP COMMENTED
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//set static dir
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
 return new Date().getFullYear();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Dave!!!!</>');
  res.render('home.hbs',{
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to the site!!'
  });
});

app.get('/about', (req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    errorMessage: 'this is an error'
  });
});

app.listen(port, () => {
  console.log('server is up on port '+port);
});
