function reverseStr(str) {
    var ListofDates = str.split("");
    var reversedStr = ListofDates.reverse();
    var strJoin = reversedStr.join("")
    return strJoin
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse
}

function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr


}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

var birth = {
    day: 02,
    month: 02,
    year: 2020
}

function checkPalindromeForAllDateFormats(date) {

    var listofFormats = getAllDateFormats(date)
    var palindrome = false;

    for (var i = 0; i < listofFormats.length; i++) {
        if (isPalindrome(listofFormats[i])) {
            palindrome = true;
            break;

        }

    }
    return palindrome;

}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++
            }
        } else {
            if (day > 28) {
                day = 1;
                month++
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year

    };
}


function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}


var birthDate = document.querySelector(".birthDate");
var checkBtn = document.querySelector(".CheckBtn");
var result = document.querySelector(".result");

function clickHandler(e) {
    var birthdate = birthDate.value;

    if (birthdate !== '') {
        var listOfDate = birthdate.split('-')


        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date)

        if (isPalindrome) {
            result.innerHTML = "yes!! your birthday is a palindrome"
        } else {
            var [ctr, nextdate] = getNextPalindromeDate(date);
            result.innerHTML = `the next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}. you missed it by ${ctr} days`
        }
    }
}



checkBtn.addEventListener('click', clickHandler)