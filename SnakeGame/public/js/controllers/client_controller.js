const path = require('path');

const mainPage = (req, res, next) => {
    res.sendFile(path.resolve(__dirname+'/../../index.html'));
}

module.exports = {
    mainPage
}