const express = require('express');
const config = require('./client_config');
const path = require('path');

const allRoutes = require('./public/js/routes/allRoutes');

const app = express();
app.use(express.json());
app.use(express.static('./public/'));

// app.get('/', (req, res, next) => {
//     res.sendFile(__dirname+'/index.html');
// })
app.use('/', allRoutes);

app.listen(config.PORT, () => {
    console.log(`Server app listening on port - ${config.PORT}`);
});

module.exports = app;