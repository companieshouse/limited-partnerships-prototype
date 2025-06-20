//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()



// Add your routes here

//router.use('/v2', require('./routes/v2-routes.js'))
//router.use('/v3', require('./routes/v3-routes.js'))
//router.use('/v4', require('./routes/v4-routes.js'))
//router.use('/v5', require('./routes/v5-routes.js'))
//router.use('/v6', require('./routes/v6-routes.js'))
//router.use('/v7', require('./routes/v7-routes.js'));
//router.use('/', require('./routes/v8-routes.js'));
//router.use('/', require('./routes/v9-routes.js'));
//router.use('/', require('./routes/v10-routes.js'));
router.use('/', require('./routes/v11-routes.js'));



// Show session data and URLs in the terminal  
router.use((req, res, next) => {  
    const log = {  
      method: req.method,  
      url: req.originalUrl,  
      data: req.session.data  
    }  
    console.log(JSON.stringify(log, null, 2))  
    next()  
  }) 