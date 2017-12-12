var express = require('express');
var app = express();

app.use(express.static("files"));

// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

app.listen(3000, function() {
    console.log('Ю-ю-ю-хув! Бібіку завели!');
});
