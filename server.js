'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ConvertHandler = require('./controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/api/convert', (req, res) => {
  let inputNum = convertHandler.getNum(req.query.input);
  let inputUnit = convertHandler.getUnit(req.query.input);
  if (inputNum === 'error' && inputUnit === 'error') {
    res.send('invalid number and unit')
  }
  else if (inputNum === 'error') res.send('invalid number');
  else if (inputUnit === 'error') res.send('invalid unit');
  else {
    let outputNum = convertHandler.convert(inputNum, inputUnit);
    let outputUnit = convertHandler.getReturnUnit(inputUnit);
    res.json({
      initNum: inputNum,
      initUnit: inputUnit,
      returnNum: convertHandler.convert(inputNum, inputUnit),
      returnUnit: convertHandler.getReturnUnit(inputUnit),
      string: convertHandler.getString(inputNum, inputUnit, outputNum, outputUnit)
    })
  }
})

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
          console.log('Tests are not valid:');
          console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
