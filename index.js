const inputDate = document.querySelector("#bday-input");
const showButton = document.querySelector("#show-btn");
const outputPalindrome = document.querySelector("#output");



//reverse a string
function reverseString(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reveresedStr = reverseListOfChars.join('');
    return reveresedStr;
}

//check if palindrome or not
function isAPalindrome(str){
    var reverse = reverseString(str);
    return str === reverse;
}

//convert the date into s string
function convertDateToString (date){
    var dateStr = {day:'', month:'', year:''};

    if(date.day < 10){
        dateStr.day = "0" + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = "0" + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}



//get possible date formats
function getAllDateFormats (date){
    var dateStr = convertDateToString(date);

    var ddmmyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

    return [ddmmyyy, mmddyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;
    for (var i=0; i<listOfPalindromes.length; i++){
        if(isAPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
     return flag;
}

function isALeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }

    return false;

}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //index is 0 - 11

    if(month === 2){           //check for leap year
        if(isALeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else {
            if(day > 28){
                day = 1;
                month++;
            }
        }

    }

    //check for rest of the months
    else{
        if(day>daysInMonth[month-1]){      //check if given day exceeds the max days of a month
            day = 1;
            month++;
        }
    }

    if(month > 12){                     //check if given month exceeds the max months of a year
        month = 1;
        year++;
    }

    return {day:day, month:month, year:year}

}

function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);

    while(1){
        counter++;
        var checkForPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(checkForPalindrome){
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate];
}

function clickHandler(event){
   var bdayStr = inputDate.value; //2021-09-08

   if(bdayStr != ''){
       var listOfDate = bdayStr.split('-');    // ['2021', '09', '16']
        
       var date = {                     // { day : '16', month : '09', year : '2021'}
           day : Number(listOfDate[2]),
           month : Number(listOfDate[1]),
           year : Number(listOfDate[0])
       };

       var isPalindrome = checkPalindromeForAllDateFormats(date);

       if(isPalindrome){
           outputPalindrome.innerText = "Yay! Your birthday is a Palindrome 🍻 🥂 🍾 "
       }
       else {
           var [counter, nextDate] = getNextPalindromeDate(date);
           outputPalindrome.innerText = "The next palindrome date is " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year +".You missed it by " + counter + " days..."
       }
       
   }
}

showButton.addEventListener('click', clickHandler )