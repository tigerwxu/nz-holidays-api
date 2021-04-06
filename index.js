const express = require('express');
const lib = require("./holidays.js");
const app = express();

let cache = {};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));

app.get('/today', (req, res) => {
    let today = new Date();
    let year = today.getFullYear();
    if (!cache[year]) {
        cache[year] = lib.generateHolidayCalendar(year);
    }
    res.send(cache[year][today.getMonth()][today.getDate()]);
    console.log("Served a request at '/today'");
});

app.get('/year/:yearString', (req, res) => {
    let year = Number.parseInt(req.params.yearString);
    res.send(lib.generateHolidayCalendar(year));
    console.log("Served a request at '/year/:yearString'");
})
