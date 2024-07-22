const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    //#1
    test("Converts valid input, input=12kg", (done) => {
        chai.request('http://localhost:3000')
            .keepOpen()
            .get('/api/convert?input=12kg')
            .end((err, res) => {
                assert.equal(res.body.initNum, 12, "initNum should be 12");
                assert.equal(res.body.initUnit, "kg", "initUnit should be kg");
                assert.equal(res.body.returnNum, 26.45549, "returnNum should be 26.45549");
                assert.equal(res.body.returnUnit, "lbs", "returnUnit should be lbs");
                assert.equal(res.body.string, "12 kilograms converts to 26.45549 pounds", "string should be '12 kilograms converts to 26.45549 pounds'");
                done();
            })
    })
    //#2
    test("Converts invalid input, input=93g", (done) => {
        chai.request('http://localhost:3000')
            .keepOpen()
            .get('/api/convert?input=93g')
            .end((err, res) => {
                assert.equal(res.text, "invalid unit", "93g should return 'invalid unit'");
                done();
            })
    })
    //#3
    test("Converts invalid number, input=2/3.6/4lbs", (done) => {
        chai.request('http://localhost:3000')
            .keepOpen()
            .get('/api/convert?input=2/3.6/4lbs')
            .end((err, res) => {
                assert.equal(res.text, "invalid number", "2/3.6/4lbs should return 'invalid number'");
                done();
            })
    })
    //#4
    test("Converts invalid number AND unit, input=9.2/3/4bananas", (done) => {
        chai.request('http://localhost:3000')
            .keepOpen()
            .get('/api/convert?input=9.2/3/4bananas')
            .end((err, res) => {
                assert.equal(res.text, "invalid number and unit", "9.2/3/4bananas should return 'invalid number and unit'");
                done();
            })
    })
    //#5
    test("Converts input with no number, input=gal", (done) => {
        chai.request('http://localhost:3000')
            .keepOpen()
            .get('/api/convert?input=gal')
            .end((err, res) => {
                assert.equal(res.body.initNum, 1, "initNum should be 1");
                assert.equal(res.body.initUnit, "gal", "initUnit should be gal");
                assert.equal(res.body.returnNum, 3.78541, "returnNum should be 3.78541");
                assert.equal(res.body.returnUnit, "L", "returnUnit should be L");
                assert.equal(res.body.string, "1 gallons converts to 3.78541 liters", "string should be '1 gallons converts to 3.78541 liters'");
                done();
            })
    })
});
