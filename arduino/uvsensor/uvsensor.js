'use strict';

var plotly = require('plotly')('workshop', 'v6w5xlbx9j');
var five = require('johnny-five');
var board = new five.Board();

var data = [{x:[], y:[], stream:{token:'25tm9197rz', maxpoints:200}},
            {x:[], y:[], stream:{token:'unbi52ww8a', maxpoints:200}}];
var layout = {fileopt : 'extend', filename : 'uv sensing nodey arduino!'};

board.on('ready', function() {

    // create a new UV sensor object
    var uvOut = new five.Sensor({
        pin: 'A0',
        freq: 1000, // get reading every 1000ms
        thresh: 0.5
    });

    // create a 3V reference Pin object
    var ref_3V3 = new five.Sensor({
        pin: 'A1',
        freq: 1000, // get reading every 1000ms
        thresh: 0.5
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
        var uvLevel = 0;
        var refLevel = 0;

        uvOut.on('data', function() {
            uvLevel = this.value;

            var data = {
                x : getDateString(),
                y : uvLevel
            };
            console.log(data);
            // write the data to the plotly stream
            stream.write(JSON.stringify(data)+'\n');
        });

        ref_3V3.on('data', function() {
            refLevel = this.value;
            var outputVoltage = 3.3 / refLevel * uvLevel;

            var data = {
                x : getDateString(),
                y : outputVoltage
            };
            console.log(data);
            // write the data to the plotly stream
            stream_2.write(JSON.stringify(data)+'\n');
        });

    });
});

// little helper function to get a nicely formatted date string
function getDateString () {
    var time = new Date();
    // 14400000 is (GMT-4 Montreal)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time - 14400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}
