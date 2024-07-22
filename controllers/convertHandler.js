function ConvertHandler() {
  let unitRegex = /[a-z]+/i; //looks for one or more of any letters (case insensitive)
  let backslashRegex = /\//g; //looks for backslashes
  let validUnits = ['kg', 'lbs', 'L', 'gal', 'km', 'mi'];
  this.getNum = function(input) {
    let result = input.substring(0, input.search(unitRegex)); //Get the index of the first letter of input (indicating start of unit) and the substring from index 0 to there will be the number
    if (result == '') return 1; //An input without a number (e.g. "kg") will be treated as 1
    else if (result.indexOf('/') != -1 && result.match(/\//g).length >= 2) return "error"; //A number input with a double (or more) fraction will return an error. First checking if a number is a fraction as looking for length of the match array outright will return an error if there is no fraction
    else if (result.indexOf('/') != -1) { //If we have a valid fraction, convert it to a decimal number
      let numerator = result.substring(0, result.indexOf('/')); //Substring from the beginning up until the slash is numerator
      let denominator = result.substring(result.indexOf('/')+1); //Substring from after the slash to the end is denominator
      return (numerator/denominator);
    }
    else return Number(result);
  };
  
  this.getUnit = function(input) {
    let result = input.substring(input.search(unitRegex)); //Get the index of the first letter of input (indicating start of unit) and the substring from there to the end will be the unit
    for (let i = 0; i < validUnits.length; i++) {
      if (result.toLowerCase() == validUnits[i].toLowerCase()) { //If unit matches a valid unit in the list, return that unit
        return validUnits[i];
      }
    }
    return 'error'; //Either there is no unit or the unit is invalid
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case "kg":
        result = "lbs";
        break;
      case "lbs":
        result = "kg";
        break;
      case "km":
        result = "mi";
        break;
      case "mi":
        result = "km";
        break;
      case "L":
        result = "gal";
        break;
      case "gal":
        result = "L";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case "kg":
        result = "kilograms";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "km":
        result = "kilometers";
        break;
      case "mi":
        result = "miles";
        break;
      case "L":
        result = "liters";
        break;
      case "gal":
        result = "gallons";
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case "kg":
        result = initNum/lbsToKg;
        break;
      case "lbs":
        result = initNum*lbsToKg;
        break;
      case "km":
        result = initNum/miToKm;
        break;
      case "mi":
        result = initNum*miToKm;
        break;
      case "L":
        result = initNum/galToL;
        break;
      case "gal":
        result = initNum*galToL;
        break;
    }
    return Number(result.toFixed(5)); //Round result to at most 5 decimal places
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
