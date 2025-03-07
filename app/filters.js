//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

module.exports = function (env) {
    env.addFilter('contains', function (str, substring) {
        return str && str.includes(substring);
    });
};