'use strict';
const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, function(){
  console.log('Listening on port 3000');
})
