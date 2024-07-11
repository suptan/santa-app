// // server.js
// // where your node app starts

// // init project
// const express = require('express');
// const morgan = require('morgan');
// const path = require('path');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser());
// app.use(morgan());

// // we've started you off with Express,
// // but feel free to use whatever libs or frameworks you'd like through `package.json`.

// app.use(express.static(path.join(__dirname, '../react-app/build')));
// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get('/', (request, response) => {
//   response.sendFile(__dirname + '/views/index.html');
// });

// // listen for requests :)
// // const listener = app.listen(process.env.PORT || 3000, function () {
// //   console.log('Your app is listening on port ' + listener.address().port);
// // });
