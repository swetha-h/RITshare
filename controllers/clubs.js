var path = require('path');

module.exports = function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../public/clubs.html'));
};
