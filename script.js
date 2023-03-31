// will have to make arrays of lower and upper letters, numbers, and symbols

// make generatePassword function
// prompt for password length is a number
// if statement if number is above 8 && below 128
// confirm for lowercase, uppercase, numeric, and special characters
// store the response in a variable
// if statement for each confirm and if it is a yes or true I would push
// or add random characters to a big array of all characters selected so far
// for loop while i is less than there answer for num length prompt
// in this for loop we would randomly pull characters from the big array
// pull random characters from the array using math.random
// string concat or push to array
// have a variable declared above for loop
// that var += theRandomChar
// return the password var

// Assignment Code

// returns a random uppercase letter
function generateRandomUppercaseLetter(){
  var uppercaseRandom = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return uppercaseRandom[Math.floor(Math.random() * uppercaseRandom.length)];
}

// returns a random lowercase letter
function generateRandomLowercaseLetter(){
  var lowercaseRandom = "abcdefghijklmnopqrstuvwxyz";
  return lowercaseRandom[Math.floor(Math.random() * lowercaseRandom.length)];
}

// returns a random number
function generateRandomNumber(){
  var numRandom = "0123456789";
  return numRandom[Math.floor(Math.random() * numRandom.length)];
}

// returns a random symbol
function generateRandomSymbol(){
  var symbolRandom = "!”#$%&’()*+,-./:;<=>?@[\\]^_`{|}~";
  return symbolRandom[Math.floor(Math.random() * symbolRandom.length)];
}

// function that asks for password input parameters
function askForPassword(){
  var choicesArr = ["y", "n"];
  var mustIncludeObj = {};

  // validates password length and pushes password length into an object
  function askPasswordLength(lengthAnswer){
    var numChoicesObj = [];
    for (var i = 8; i <= 128; i++) {
      numChoicesObj.push(i);
    }
    var userInput = window.prompt("Choose a password length between 8 and 128 characters: ").trim();
    var lengthInput = parseInt(userInput);
      if (numChoicesObj.includes(lengthInput)){
        if (lengthInput >= 8 && lengthInput <= 128){
          mustIncludeObj.passwordLength = lengthInput;
        }else{
          askPasswordLength();
        }
      }else{
        askPasswordLength();
      }  
  }
  // asks if want to include uppercase letters and pushes response into an object
  function askUppercaseLetterInclude(){
    var askForUppercaseLetter = window.prompt("Do you want to include uppercase letters? y or n: ").trim().toLowerCase();
    var includeUppercaseLetter;
    if (choicesArr.includes(askForUppercaseLetter)){
      includeUppercaseLetter = askForUppercaseLetter == "y";
      mustIncludeObj.uppercaseLetter = includeUppercaseLetter;
    }else{
      askUppercaseLetterInclude();
    }
  }
  // asks if want to include lowercase letters and pushes response into an object
  function askLowercaseLetterInclude(){
    var askForLowercaseLetter = window.prompt("Do you want to include lowercase letters? y or n: ").trim().toLowerCase();
    var includeLowercaseLetter;  
    if (choicesArr.includes(askForLowercaseLetter)){
      includeLowercaseLetter = askForLowercaseLetter == "y";
      mustIncludeObj.lowercaseLetter = includeLowercaseLetter;
    }else {
      askLowercaseLetterInclude();
    }
  }
  // asks if want to include numeric values and pushes response into an object
  function askNumInclude(){
    var askForNum = window.prompt("Do you want to include numeric characters? y or n: ").trim().toLowerCase();
    var includeNum;  
    if (choicesArr.includes(askForNum)){
      includeNum = askForNum == "y";
      mustIncludeObj.numChar = includeNum;
    }else {
      askNumInclude();
    }
  }
  // asks if want to include symbol characters and pushes response into an object
  function askSymbolInclude(){
    var askForSymbol = window.prompt("Do you want to include symbol characters: y or n: ").trim().toLowerCase();
    var includeSymbol;
    if (choicesArr.includes(askForSymbol)){
      includeSymbol = askForSymbol == "y";
      mustIncludeObj.symbolChar = includeSymbol;
    }else{
      askSymbolInclude();
    }
  }
  askPasswordLength();
  askUppercaseLetterInclude();
  askLowercaseLetterInclude();
  askNumInclude();
  askSymbolInclude()
  // Invalid input if each criteria is no which equals false, and prompts to ask for password criteria again
  if (mustIncludeObj.uppercaseLetter == false && mustIncludeObj.lowercaseLetter == false && mustIncludeObj.numChar == false && mustIncludeObj.symbolChar == false){
    window.alert("Invalid Input:\n -----\n Must include at least one uppercase letter, lowercase letter, number, or symbol.\n -----\n Please try again.");
    return askForPassword();
  }
  console.log(mustIncludeObj);
  return mustIncludeObj;
}

// takes in an object {password length, uppercase true/false, lowercase true/false, num true/false, symbol true/false}
// "passwordLength": password length --> number
// "uppercaseLetter": uppercase --> true/false
  // if true include
// "lowercaseLetter": lowercase --> true/false
  // if true include
// "numChar": num --> true/false
  // if true include
// "symbolChar": symbol --> true/false
  // if true include
// generate password
function generatePassword(passwordParam){
  var itemsInclude = [];
  var runningPassword = [];
  var fullPasswordString;
  if (passwordParam.uppercaseLetter){
    itemsInclude.push(generateRandomUppercaseLetter);
  }
  if (passwordParam.lowercaseLetter){
    itemsInclude.push(generateRandomLowercaseLetter);
  }
  if (passwordParam.numChar){
    itemsInclude.push(generateRandomNumber);
  }
  if (passwordParam.symbolChar){
    itemsInclude.push(generateRandomSymbol);
  }

  for (var i = 0; i < passwordParam.passwordLength; i++) {
    var characterIndex = i % itemsInclude.length;
    runningPassword.push(itemsInclude[characterIndex]());
  }
  // takes the returned shufflePasswordArray and changes it to a string
  shufflePasswordArray(runningPassword);
  fullPasswordString = runningPassword.join("");
  console.log("Password: " + fullPasswordString);
  return fullPasswordString
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// JavaScript implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates
// this takes passwordArray as a parameter
// it shuffles the values in the array
function shufflePasswordArray(passwordArray) {
  for (var i = passwordArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempArray = passwordArray[i];
      passwordArray[i] = passwordArray[j];
      passwordArray[j] = tempArray;
  }
}

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var passwordCriteria = askForPassword();
  var password = generatePassword(passwordCriteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
