const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to print in server.js');
    }
  })
  console.log(log);
  next();
});

app.use((req,res, next)=>{
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.get('/', (req, res) => {

  res.render("home.hbs", {pageTitle:'Home Age', welcomeMessage:"Welcome Page"})

});

app.get('/about', (req, res) => {

  res.render("about.hbs", {pageTitle:'About Age'  })

});

app.listen(3000, ()=>{
  console.log("server started on port 3000");
});
