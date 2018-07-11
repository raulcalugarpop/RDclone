const app = require('./app.js');


/// ip = process.env.IP;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});