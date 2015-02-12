'use strict';

var plotly = require('plotly')('workshop', 'v6w5xlbx9j');
var five = require('johnny-five');
var board = new five.Board();

var data = [{x:[], y:[], stream:{token:'25tm9197rz', maxpoints:200}},
            {x:[], y:[], stream:{token:'unbi52ww8a', maxpoints:200}}
];
var layout = {fileopt : 'overwrite', filename : 'uv sensing nodey arduino!'};

board.on('ready', function() {

    // create a new Analog Sensor sensor object
    var analog_light_sensor = new five.Sensor({
        pin: 'A0',
        freq: 1000 // get reading every 1000ms
    });

    // initialize the plotly graph
    plotly.plot(data,layout,function (err, res) {
        if (err) console.log(err);
        console.log(res);

        //once it's initialized, create a plotly stream
        //to pipe your data!
        var stream = plotly.stream('25tm9197rz', function (err, res) {
            if (err) console.log(err);
            console.log(res);
        });

        var stream_2 = plotly.stream('unbi52ww8a', function (err, res) {
            if (err) console.log(err);
            console.log(res);
        });

        // this gets called each time there is a new sensor reading
        analog_light_sensor.on('data', function() {
            var rawValue = this.value;
            console.log('raw : '+rawValue);

            var data = {
                x : getDateString(),
                y : rawValue
            };
            console.log(data);
            // write the data to the plotly stream
            rawToLux(rawValue, stream_2);
            stream.write(JSON.stringify(data)+'\n');
        });
    });
});

// function that takes rawInput and converts it to lux
// then streams it to plotly
function rawToLux(raw, stream_2) {
    var rawRange = 1024; // 3.3v
    var logRange = 5.0; // 3.3v = 10^5 lux
    var logLux = raw * logRange / rawRange;
    var data = {
        x : getDateString(),
        y : Math.pow(10, logLux)
    };
    console.log(data);
    stream_2.write(JSON.stringify(data)+'\n');
}

// little helper function to get a nicely formatted date string
function getDateString () {
    var time = new Date();
    // 14400000 is (GMT-4 Montreal)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time - 14400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}
