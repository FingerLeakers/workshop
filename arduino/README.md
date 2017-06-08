# Notes on Usage
Got a new Arduino? Have a sensor? Great! You'll be visualizing your sensor data in no time! No wifi shield, ethernet shield or voodoo magic required.
It's easy!

Thanks to Node.js and the Johnny-Five library, you can easily interface with your Arduino and get started working on things right away!


# Easy:

#### Install node.js
[Download Here](http://nodejs.org/download)

#### Download and install the latest Arduino software
[Download Here](http://arduino.cc/en/main/software)

#### Launch the Arduino IDE, and upload the 'Standard Firmata' sketch to your board.
Once uploaded, close the Arduino IDE. We're done with it. The 'Standard Firmata' sketch is all we need to upload to allow any computer with node.js to communicate with it!

#### In your terminal, create a folder for your sensor project and move into it
```
$ mkdir your-project-name
$ cd your-project-name
```
#### Use the node package manager (npm) to install the required libraries.
node.js is awesome and will only install these modules in your project directory. It's easy to keep things modular and organized!
```
$ npm install plotly
$ npm install johnny-five
```
#### Download one of our example scripts into your project folder and type:
```
$ node example-script.js
```
Johnny-Five will automatically connect to your Arduino over serial, and start streaming all the data to Plotly!
