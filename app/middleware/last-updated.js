// middleware/last-updated.js
const path = require('path');
const { getLatestModifiedDate } = require('../helpers/fileUtils');

module.exports = (req, res, next) => {
  const latestDate = getLatestModifiedDate(path.join(__dirname, '..'));

  res.locals.lastUpdated = latestDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  next();
};
