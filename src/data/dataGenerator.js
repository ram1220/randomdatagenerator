var cuid = require('cuid');
let data = [];
var SLEEP_STATE = ['AWAKE', 'ASLEEP'];
const generateSleepMinutes = () => {
    //Total 8 hours --- 480 mins
    let MIN_SLEEP = 1; // Min Minimum Sleep
    let MAX_SLEEP = 60; // in Total min expecting in hours of sleep
    return Math.floor(Math.random() * MAX_SLEEP) + MIN_SLEEP;
}

const generateDateRangeStartEnd = (hour) => {

    let randomDay = Math.floor(Math.random() * 7) + 1;
    let randomHours = Math.floor(Math.random() * 23) + 1;
    let start_date = new Date();
    start_date.setHours(randomHours);
    start_date.setDate((randomDay + 7 - start_date.getDay()) % 7);
    let end_date = new Date();
    end_date.setHours(randomHours);
    end_date.setDate((randomDay + 7 - end_date.getDay()) % 7);
    let sleepDuration = generateSleepMinutes();
    end_date.setMinutes(end_date.getMinutes() + sleepDuration)
    return {
        start: start_date.toISOString(),
        end: end_date.toISOString(),
        duration: sleepDuration
    }
}

let TOTAL_RECORD = 1440;

let generateFakeData = () => {
    data = [];
    for (let i = 0; i < TOTAL_RECORD; i++) {
        let sleepTrackObject = Object.assign({}, {
            id: cuid(),
            sleepStatus: SLEEP_STATE[Math.floor(Math.random() * 2)],
        }, generateDateRangeStartEnd())
        data.push(sleepTrackObject);
    };
    console.log(data)
    return data
}


module.exports.generateFakeData = generateFakeData;
/*
{
    "_id" : ObjectId("5a33fed3fd559e16f10e17a2"),r
    "sleepStatus" : "ASLEEP",
    "start" : ISODate("2017-12-15T16:55:00.000+0000"),
    "end" : ISODate("2017-12-15T16:56:00.000+0000"),
    "utcOffset" : NumberInt(-21600000),
    "duration" : NumberInt(60),
    "seq" : NumberInt(1159),
    "timeOffset" : NumberInt(0),
    "clientStart" : 1513356900000.0,
    "createAt" : ISODate("2017-12-15T16:56:51.851+0000"),
    "userId" : "59f9fe55a6871a8d35f75433"
}


{
    "_id" : ObjectId("5a33f0bfdf6bfb599a85b93e"),
    "sleepStatus" : "AWAKE",
    "start" : ISODate("2017-12-15T15:36:00.000+0000"),
    "end" : ISODate("2017-12-15T15:37:00.000+0000"),
    "utcOffset" : NumberInt(-21600000),
    "duration" : NumberInt(60),
    "seq" : NumberInt(1080),
    "timeOffset" : NumberInt(0),
    "clientStart" : 1513352160000.0,
    "createAt" : ISODate("2017-12-15T15:56:47.967+0000"),
    "userId" : "59f9fe55a6871a8d35f75433"
}*/