const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    //#1
    test('Reads whole number', () => {
        assert.equal(convertHandler.getNum('25kg'), '25', '25kg should return 25');
    })
    //#2
    test('Reads decimal number', () => {
        assert.equal(convertHandler.getNum('12.2mi'), '12.2', '12.2mi should return 12.2');
    })
    //#3
    test('Reads fractional number', () => {
        assert.equal(convertHandler.getNum('1/2gal'), '0.5', '1/2gal should return 0.5');
    })
    //#4
    test('Reads fractional number with decimal', () => {
        assert.equal(convertHandler.getNum('4.9/4lbs'), '1.225', '4.9/4lbs should return 1.225');
    })
    //#5
    test('Returns error on double fraction', () => {
        assert.equal(convertHandler.getNum('3/5/4lbs'), 'error', '3/5/4lbs should return error due to double fraction')
    })
    //#6
    test('Defaults to numerical input of 1 if no numerical input is provided', () => {
        assert.equal(convertHandler.getNum('kg'), '1', 'Input with no number should return a numerical value of 1')
    })
    //#7
    test('Correctly reads each valid input unit', () => {
        assert.equal(convertHandler.getUnit('1.3kg'), 'kg', '1.3kg should return kg')
        assert.equal(convertHandler.getUnit('3.1lbs'), 'lbs', '3.1lbs should return lbs')
        assert.equal(convertHandler.getUnit('3/4gal'), 'gal', '3/4gal should return gal')
        assert.equal(convertHandler.getUnit('9/5l'), 'L', '9/5l should return L')
        assert.equal(convertHandler.getUnit('12mi'), 'mi', '12mi should return mi')
        assert.equal(convertHandler.getUnit('5km'), 'km', '5km should return km')
    })
    //#8
    test('Correctly returns an error for an invalid input unit', () => {
        assert.equal(convertHandler.getUnit('20.4ft'), 'error', '20.4ft should return an error')
        assert.equal(convertHandler.getUnit('3/4bananas'), 'error', '3/4bananas should return an error')
        assert.equal(convertHandler.getUnit('2'), 'error', 'Input without a unit should return an error')
    })
    //#9
    test('Returns correct input unit for each valid input unit', () => {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'kg should return lbs')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'lbs should return kg')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'mi should return km')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'km should return mi')
        assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'gal should return L')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'L should return gal')
    })
    //#10
    test('Returns correct spelled-out string unit for each valid input unit', () => {
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg should return kilograms')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs should return pounds')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'mi should return miles')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'km should return kilometers')
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'gal should return gallons')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'L should return liters')
    })
    //#11
    test('Correctly converts gal to L', () => {
        assert.equal(convertHandler.convert(2, 'gal'), 7.57082, '2gal is 7.57082L')
    })
    //#12
    test('Correctly converts L to gal', () => {
        assert.equal(convertHandler.convert(4, 'L'), 1.05669, '4L is 1.05669gal')
    })
    //#13
    test('Correctly converts mi to km', () => {
        assert.equal(convertHandler.convert(0.5, 'mi'), 0.80467, '0.5mi is 0.80467 km')
    })
    //#14
    test('Correctly converts km to mi', () => {
        assert.equal(convertHandler.convert(5.8, 'km'), 3.60396, '5.8km is 3.60396mi')
    })
    //#15
    test('Correctly converts lbs to kg', () => {
        assert.equal(convertHandler.convert(156, 'lbs'), 70.76035, '156lbs is 70.76035kg')
    })
    //#16
    test('Correctly converts kg to lbs', () => {
        assert.equal(convertHandler.convert(90.69, 'kg'), 199.93739, '90.69kg is 199.93739lbs')
    })
});