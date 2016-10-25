var express = require('express');
var app = express();

app.use( express.static('dist'));

// // GET method route
// app.get('/dental', function (req, res) {
//   res.send('GET request to the homepage--');
// });



app.listen(8080);