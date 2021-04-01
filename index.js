const express = require('express');

const app = express();

let holidays = {
//  "[month]-[day]" : "[name]"
    "1-1" : "New Year's Day",
    "1-2" : "Day after New Year's Day",
    "2-6" : "Waitangi Day",
    "4-2" : "Good Friday",
    "4-5" : "Easter Monday",
    "4-25" : "Anzac Day",
    "6-7" : "Queen’s Birthday",
    "10-25" : "Labour Day",
    "12-25" : "Christmas Day",
    "12-26" : "Boxing Day"
}





app.get('/', (request, response) => {
    response.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => console.log("app running on localhost:3000"));