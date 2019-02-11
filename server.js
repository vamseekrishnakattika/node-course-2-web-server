const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  })
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs')
});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase()
})

// app.get('/',(req,res) => {
//   // res.send('<h1>Hello Express!</h1>')
//   res.send({
//     name:'Vamsee',
//     likes:[
//       'Biking',
//       'Cities'
//     ]
//   });
// });

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitile: 'About Page',
  });
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitile: 'Home Page',
    welocmeMessage: 'Welcome to Home Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'Unable to handle request'
  });
});

app.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});
