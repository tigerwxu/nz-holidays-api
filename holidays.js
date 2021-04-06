module.exports = { generateHolidayCalendar };

/**
 * 
 * @param {number} year - The year to calculate Easter holidays for
 * @param {Object} calendar - The calendar object to add Easter holidays to
 */
function getEaster(year, calendar)
{
    let a = year % 19;
    let b = Math.trunc(year / 100);
    let c = year % 100;
    let d = Math.trunc(b / 4);
    let e = b % 4;
    let g = Math.trunc((8 * b + 13) / 25);
    let h = (19 * a + b - d - g + 15) % 30;
    let m = Math.trunc((a + 11 * h) / 319);
    let j = Math.trunc(c / 4);
    let k = c % 4;
    let l = (2 * e + 2 * j - k - h + m + 32) % 7;
    let n = Math.trunc((h - m + l + 90) / 25);
    let p = (h - m + l + n + 19) % 32;

    let date = new Date(year, n - 1, p); // Easter Sunday
    // Easter Sunday is technically not a holiday in NZ!
    // calendar[date.getMonth() + 1][date.getDate()] = "Easter Sunday";
    date.setDate(date.getDate() - 2); // Good Friday
    calendar[date.getMonth() + 1][date.getDate()] = "Good Friday";
    date.setDate(date.getDate() + 3); // Easter Monday
    calendar[date.getMonth() + 1][date.getDate()] = "Easter Monday";
}

/**
 * 
 * @param {number} year - The year to calculate Queen's Birthday date for
 * @param {Object} calendar - The calendar object to add the Queen's Birthday date to
 */
function getQueensBirthday(year, calendar) {
    let d = new Date(year, 5);
    
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    calendar[d.getMonth() + 1][d.getDate()] = "Queen's Birthday";
}

/**
 * 
 * @param {number} year - The year to calculate Labour Day date for
 * @param {Object} calendar - The calendar object to add the Labour Day date to
 */
function getLabourDay(year, calendar) {
    let d = new Date(year, 9);
    
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    d.setDate(d.getDate() + 21);

    calendar[d.getMonth() + 1][d.getDate()] = "Labour Day";
}

/**
 * 
 * @param {*} year - The year to generate a calendar of holidays for
 * @returns - A calendar object representing the holidays of the year
 */
function generateHolidayCalendar(year) {
    let holidays = {
        1: {
            1: "New Year's Day",
            2: "Day after New Year's Day"
        },
        2: {
            6: "Waitangi Day"
        }, 
        3: {},
        4: {
            25: "Anzac Day"
        },
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {
            25: "Christmas Day",
            26: "Boxing Day"
        }
    };

    getEaster(year, holidays);
    getLabourDay(year, holidays);
    getQueensBirthday(year, holidays);

    return holidays;
}
