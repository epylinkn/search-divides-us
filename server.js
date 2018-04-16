//== Express setup
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function() {
  console.log('Server listening at port: ', port);
});

app.use(express.static('public'));

//== Serial setup
let serialserver = require('p5.serialserver');
serialserver.start();
console.log("p5.serialserver is running");
