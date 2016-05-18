
var Botkit = require('botkit');
var request = require('request');
var slackToken;
var controller = Botkit.slackbot({
    debug: false
});

if (process.env.SLACK_TOKEN == undefined || process.env.SLACK_TOKEN == null) {
    var Secret = require('./secret.js');
    slackToken = Secret.slackToken;
} else {
    slackToken = process.env.SLACK_TOKEN;
}


controller.spawn({
    token: slackToken
}).startRTM();

// give the bot something to listen for.
var randomCount =  function(min, mult){
    return (Math.round(Math.random()*mult)) + min;
};

var isWorkDay = function(currentTime){
    return (currentTime.getDay() > 0 && currentTime.getDay() < 6);
};

var isWorkHour = function(currentTime) {
    return (currentTime.getHours() >= 13 && currentTime.getHours() <= 23);
};

var isOnHour = function(currentTime){
    return currentTime.getMinutes() === 0
};

var botGreeting = "Get ready for your hourly workouts on the hour!\nJust remember:\n\"Dude, suckin' at something is the first step towards being sorta good at something\"\nSay, 'stop' to stop.";

controller.hears('start',['direct_message','direct_mention','mention'],function(bot,message) {

    bot.reply (message, botGreeting);

    timer = setInterval(function(){hourlyTimer()},60000);

    var exercises = [
        "It's that time! Gimme " + randomCount(5, 10) + " squats!",
        "You'll never make progress unless you start!\nDo " + randomCount(5, 10) + " lunges",
        "Repetition makes perfect.\nDrop and do " + randomCount(5,10) + " donkey kicks.",
        "Channel your inner ballerina,\n" + randomCount(5, 10) + " calf raises",
        "Focus that core! Hold a plank for 30 seconds.",
        "Get those obliques! Hold a side plank for 30 secs on each side.",
        "You got this.\nDo " + randomCount(5,10) + " reverse crunches.",
        "Drop and give me " + randomCount(5,10) + " pushups",
        "Find something stable to use and do " + randomCount(5, 10) + " tricep dips",
        "Oh, look at the time! You don't even have to get up!\n Do " + randomCount(15, 30) + " seconds of arm circles."

    ];

    function hourlyTimer() {
        var currentTime = new Date();
        if(!isWorkDay(currentTime) || !isWorkHour(currentTime)|| !isOnHour(currentTime)) {
            return;
        }

        var rndNum = Math.round(Math.random()*9);

        bot.reply(message, exercises[rndNum]);

    }
    controller.hears('stop',['direct_message','direct_mention','mention'],function(bot,message) {
        clearInterval(timer);
        bot.reply(message, "Okay... if you're sure... I'll shut up now.");
    });
});
controller.hears('help', ['direct_message', 'direct_mention', 'mention'],function(bot,message){
    bot.reply(message, "I can send you hourly workouts to do with a randomized rep count.\nCommands:\n" +
        "*start core*: I'll only send you core workouts\n" +
        "*start legs*: I'll only send you leg workouts\n" +
        "*start arms* / *start upperbody* / *start upper body*: I'll only send you upper-body workouts\n" +
        "*start*: Gets me started and I'll continue to send you the default random workouts on the hour\n" +
        "*stop*: I'll shut up until you tell me to start again\n"
    )
});

controller.hears('start core',['direct_message','direct_mention','mention'],function(bot,message) {

    bot.reply (message, botGreeting);

    timer = setInterval(function(){hourlyTimer()},60000);

    var exercises = [
        "It's that time! Gimme " + randomCount(5, 10) + " reverse crunches",
        "You'll never make progress unless you start!\nDo " + randomCount(5, 10) + " mountain climbers",
        "Repetition makes perfect.\nDrop and do " + randomCount(5,10) + " leg lifts.",
        "Channel your inner swimmer,\n" + randomCount(5, 10) + " flutter kicks",
        "Focus that core! Hold a plank for 30 seconds.",
        "Get those obliques! Hold a side plank for 30 secs on each side."
    ];

    function hourlyTimer() {
        var currentTime = new Date();
        if(!isWorkDay(currentTime) || !isWorkHour(currentTime)|| !isOnHour(currentTime)) {
            return;
        }

        var rndNum = Math.round(Math.random()*5);

        bot.reply(message, exercises[rndNum]);

    }
    controller.hears('stop',['direct_message','direct_mention','mention'],function(bot,message) {
        clearInterval(timer);
        bot.reply(message, "Okay... if you're sure... I'll shut up now.");
    });
});

controller.hears('start legs',['direct_message','direct_mention','mention'],function(bot,message) {

    bot.reply (message, botGreeting);

    timer = setInterval(function(){hourlyTimer()},60000);

    var exercises = [
        "It's that time! Gimme " + randomCount(5, 10) + " squats!",
        "You'll never make progress unless you start!\nDo " + randomCount(5, 10) + " lunges",
        "Repetition makes perfect.\nDrop and do " + randomCount(5,10) + " donkey kicks.",
        "Channel your inner ballerina,\n" + randomCount(5, 10) + " calf raises",
        "You got this.\nDo " + randomCount(5,10) + " squat jumps.",
        "Drop and give me " + randomCount(5,10) + " single leg squats"

    ];

    function hourlyTimer() {
        var currentTime = new Date();
        if(!isWorkDay(currentTime) || !isWorkHour(currentTime)|| !isOnHour(currentTime)) {
            return;
        }

        var rndNum = Math.round(Math.random()*5);

        bot.reply(message, exercises[rndNum]);

    }
    controller.hears('stop',['direct_message','direct_mention','mention'],function(bot,message) {
        clearInterval(timer);
        bot.reply(message, "Okay... if you're sure... I'll shut up now.");
    });
});
controller.hears(['start upper body', 'start upperbody', 'start arms'] ,['direct_message','direct_mention','mention'],function(bot,message) {

    bot.reply (message, botGreeting);

    timer = setInterval(function(){hourlyTimer()},60000);

    var exercises = [
        "You'll never make progress unless you start!\nDo " + randomCount(5, 10) + " hip hinges",
        "Repetition makes perfect.\nDrop and do " + randomCount(5,10) + " superman poses.",
        "It's that time,\n" + randomCount(5, 10) + " dolphin kicks",
        "Drop and give me " + randomCount(5,10) + " pushups",
        "Find something stable to use and do " + randomCount(5, 10) + " tricep dips",
        "Oh, look at the time! You don't even have to get up!\n Do " + randomCount(15, 30) + " seconds of arm circles."

    ];

    function hourlyTimer() {
        var currentTime = new Date();
        if(!isWorkDay(currentTime) || !isWorkHour(currentTime)|| !isOnHour(currentTime)) {
            return;
        }

        var rndNum = Math.round(Math.random()*5);

        bot.reply(message, exercises[rndNum]);

    }
    controller.hears('stop',['direct_message','direct_mention','mention'],function(bot,message) {
        clearInterval(timer);
        bot.reply(message, "Okay... if you're sure... I'll shut up now.");
    });
});