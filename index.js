const express = require('express');
const app = express();

// TODO: These are only valid for 2021 (some dates like Easter monday change each year)
// We'll need to implement logic that generates holidays that change dates each year
let holidays = {
    //  "[month]-[day]" : "[name]"
    "1-1": "New Year's Day",
    "1-2": "Day after New Year's Day",
    "2-6": "Waitangi Day",
    "4-2": "Good Friday",
    "4-5": "Easter Monday",
    "4-25": "Anzac Day",
    "6-7": "Queen’s Birthday",
    "10-25": "Labour Day",
    "12-25": "Christmas Day",
    "12-26": "Boxing Day"
}

function dateToKey(date)
{
    return (date.getMonth() + 1) + "-" + date.getDate();
}

function makeResponse(date)
{
    dateKey = dateToKey(date);
    const response = {
        'date' : date.toDateString(),
        'holidayName' : holidays[dateKey] ?? "Normal Day",
        'isWeekend' : date.getDay() == 0 || date.getDay() == 6
    };
    return response;
}

app.get('/', (req, res) => {
    let today = new Date();
    let body = makeResponse(today);
    res.send(body);
    console.log("Served a request at '/'");
});

//TODO: Throw error on invalid dateStrings
app.get('/:dateString', (req, res) => {
    date = new Date(req.params.dateString);
    res.send(makeResponse(date));
    console.log("Served a request at '/:dateString'");
});

app.listen(process.env.PORT || 3000, () => console.log("app running on localhost:3000"));