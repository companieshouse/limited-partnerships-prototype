//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const lastUpdated = require('../middleware/last-updated')

// Add the middleware to the router
router.use(lastUpdated)

// Add your routes here
// Logging session data 
 
router.use((req, res, next) => { 
    const log = { 
    method: req.method, 
    url: req.originalUrl, 
    data: req.session.data 
    } 
    console.log(JSON.stringify(log, null, 2)) 
   
    next() 
    })
// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; //current screen
    res.locals.prevURL = req.get('Referrer'); // previous screen
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
    next();
  });

// GOV One Login Sign in

  router.post('/gov-onelogin-email', function(request, response) {
    var govOneLoginEmail = request.session.data['govOneLoginEmail']
    if (govOneLoginEmail == "someone@test.com"){
        response.redirect("/v9/not-eligible")
    } 
    else {
        response.redirect("/v9/gov-onelogin-password")
    }
  })


// GOV One Login Check your phone


router.post('/gov-onelogin-enter-code', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v9/company-number")
    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("/v9/starting-new")
     } 
     else {
        response.redirect("/v9/starting-new")
    }
})




  // name ending

  router.post('/which-type', function(request, response) {

    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("/v9/registration/pflp-name")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("/v9/registration/scottish-pflp-name")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("/v9/registration/slp-name")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("/v9/registration/sqp-name")
     } 
     else {
        response.redirect("/v9/registration/lp-name")
    }
})

router.post(['/lp-name', '/pflp-name', '/slp-name', '/sqp-name'], (request, response) => {
    var lpChooseName = request.session.data['lpChooseName'];
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    
    if (lpChooseName && lpChooseName.toLowerCase().includes("harrods")) {
        response.redirect("/v9/registration/same-as-name");
    } else if (lpChooseName && lpChooseName.toLowerCase().includes("bank")) {
        response.redirect("/v9/registration/sensitive-name");
    } else if (request.path === '/lp-name' && registrationOrTransition === "post") {
        response.redirect("/v9/manage/check-your-answers-change-name");
    } else {
        response.redirect("/v9/limited-partnership-rea");
    }
});

  

//Has the LP done IDV

router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("/v9/idv-no")
  } 
  else {
      response.redirect("/v9/limited-partnership-rea")
  }
})

// LP number confirm - transition or post-transition




  router.post('/company-number', function(request, response) {
    var lpNumber = request.session.data['lpNumber']
    if (lpNumber == "LP999999"){
        response.redirect("/v9/transition-already-filed")
    } 
    else {
        response.redirect("/v9/correct-company")
    }
  })




router.post('/correct-company', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v9/manage/limited-partnership-overview-tabs-wf")
    } 
    else {
        response.redirect("/v9/limited-partnership-rea")
    }
  })



  router.post('/limited-partnership-rea', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v9/limited-partnership-jurisdiction")
    } 
    else {
        response.redirect("/v9/limited-partnership-roa")
    }
  })

  router.post('/company-number', function (req, res) {
    res.redirect('/v9/correct-company')
  })




//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("/v9/gp-person")
    } else {
        response.redirect("/v9/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    var registrationOrTransition = request.session.data['registrationOrTransition']

    if (registrationOrTransition == "post") {
        response.redirect("/v9/manage/confirmation-additional-gp")
    } else if (addAnotherGP == "addPersonGP") {
        response.redirect("/v9/gp-person")
    } else if (addAnotherGP == "addEntityGP") {
        response.redirect("/v9/gp-legal-entity")
    } else {
        response.redirect("/v9/limited-partner-section")
    }

})


//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("/v9/lp-person")
    } else {
        response.redirect("/v9/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {
    var addAnotherLP = request.session.data['addAnotherLP'];
    var lpNumber = request.session.data['lpNumber'];
    var registrationOrTransition = request.session.data['registrationOrTransition']; // ✅ Get value from session
    var registerType = request.session.data['registerType']; // ✅ Get value from session

    if (addAnotherLP == "addPersonLP") {
        response.redirect("/v9/lp-person");
    } 
    else if (addAnotherLP == "addEntityLP") {
        response.redirect("/v9/lp-legal-entity");
    } 
    else if (
        lpNumber.startsWith("SL") || 
        lpNumber.startsWith("SG") || 
        (registrationOrTransition === "registration" && 
        (registerType === "registerSlp" || registerType === "RegisterPflpSco"))
    ) {
        // response.redirect("/v9/psc-section");
        response.redirect("/v9/pscs/psc-section");
    } 
    else {
        response.redirect("/v9/check-your-answers");
    }
});




// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('/v9/registration/which-type')
})




// Registration - LP statement
//router.post('/lp-statement', function(request, response) {
//   response.redirect('/v9/idv-filter')
//})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v9/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v9/transition-start-page")
    }
    else {
        response.redirect("/v9/post-transition-start-page")
    }
  })

// Start

router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v9/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v9/transition-start-page")
    }
    else {
        response.redirect("/v9/post-transition-start-page")
    }
  })

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    response.redirect('/v9/limited-partnership-roa-choose-address')
});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('/v9/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
router.post('/limited-partnership-roa-confirm-address', function(request, response) {

   var registrationOrTransition = request.session.data['registrationOrTransition']
   if (registrationOrTransition == "post"){
      response.redirect("/v9/filing-confirmation")
   }
      else if (registrationOrTransition == "transition"){
        response.redirect("/v9/general-partner-section")
   } 
   else {
      response.redirect("/v9/limited-partnership-ppob")
  }
})

//Registered office address (manual)
router.post('/limited-partnership-roa-manual', function(request, response) {
    response.redirect('/v9/limited-partnership-roa-confirm-address')
})


//PPOB

router.post('/limited-partnership-ppob', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    var registerType = request.session.data['registerType'];

    if (registrationOrTransition === "transition") {
        response.redirect("/v9/general-partner-section");
    } else if (registerType === "RegisterPflp" || registerType === "RegisterPflpSco") {
        response.redirect("/v9/general-partner-section");
    } else if (registerType === "registerSlp" || registerType === "RegisterSqp") {
        response.redirect("/v9/limited-partnership-terms");
    } else {
        response.redirect("/v9/limited-partnership-terms");
    }
});




// Starting new?

router.post('/starting-new', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v9/registration/which-type")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v9/company-number")
    }
    else {
        response.redirect("/v9/company-number")
    }
  })

// Terms of partnership


router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v9/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v9/transition-start-page")
    }
    else {
        response.redirect("/v9/post-transition-start-page")
    }
  })

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v9/manage/check-your-answers-change-term")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v9/general-partner-section")
    }
    else {
        response.redirect("/v9/limited-partnership-sic")
    }
})

/// SIC codes

router.post('/limited-partnership-sic', function(request, response) {
    var checkSIC = request.session.data['checkSIC']

    if (checkSIC === "no") {
        response.redirect('/v9/confirmation-statement/check-sic')
    } else {
        response.redirect('/v9/general-partner-section')
    }
})

/// CS Date

router.post('/confirmation-statement-date', function(request, response) {
    var changeDateOfCS = request.session.data['changeDateOfCS']

    if (changeDateOfCS === "yes") {
        response.redirect('/v9/confirmation-statement/check-your-answers-change-cs-date')
    } else {
        response.redirect('/v9/confirmation-statement/check-sic')
    }
})

//PSC - Scottish entities only



router.post('/psc-statement', function(request, response) {
    var pscStatement = request.session.data['pscStatement']

    if (pscStatement && pscStatement.includes("There is no person identified as a person with significant control")) {
        response.redirect('/v9/check-your-answers')
    } else {
        response.redirect('/v9/pscs/psc-choice')
    }
})

router.post('/psc-choice', function(request, response) {

    var pscType = request.session.data['pscType']
    if (pscType == "entity"){
        response.redirect("/v9/pscs/psc-legal-entity")
    }
    else if (pscType == "orp"){
        response.redirect("/v9/pscs/psc-orp")
    }
    else {
        response.redirect("/v9/pscs/psc-person")
    }
  })

  // add another PSC


  router.post('/psc-add-another', function(request, response) {

    var addAnotherPSC = request.session.data['addAnotherPSC']
    if (addAnotherPSC == "person"){
        response.redirect("/v9/pscs/psc-person")
    }
    else if (addAnotherPSC == "entity"){
        response.redirect("/v9/pscs/psc-legal-entity")
    }
    else if (addAnotherPSC == "orp"){
        response.redirect("/v9/pscs/psc-orp")
    }
    else {
        response.redirect("/v9/check-your-answers")
    }
  })




  //Payment Placeholder


  router.post('/payment-placeholder', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v9/manage/confirmation-change-name")
    }
    else {
        response.redirect("/v9/confirmation-page")
    }
  })


// Addresses //

// General partner - legal entity //

//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manually entering it
router.get('/v9/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual', function (req, res) {
    res.render('v9/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });



router.post('/gp-legal-entity-poa-where', function(request, response) {

    var gpLegalEntityPOAWhere = request.session.data['gpLegalEntityPOAWhere']
    if (gpLegalEntityPOAWhere == "gpLegalEntityPOAUK"){
        response.redirect("/v9/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-postcode-look-up")
    }
    else {
        response.redirect("/v9/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual")
    }
  })



router.post('/gp-legal-entity-poa-postcode-look-up', function(request, response) {
    response.redirect('/v9/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-choose-address')
})


  router.post('/gp-legal-entity-poa-choose-address', function(request, response) {
    response.redirect('/v9/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-confirm-address')
})

// General partner - person //
// URA //
//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/v9/address-pages/gp-person-ura/gp-person-ura-manual', function (req, res) {
    res.render('v9/address-pages/gp-person-ura/gp-person-ura-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });

router.post('/gp-person-ura-where', function(request, response) {

    var gpPersonURAWhere = request.session.data['gpPersonURAWhere']
    if (gpPersonURAWhere == "gpPersonURAUK"){
        response.redirect("/v9/address-pages/gp-person-ura/gp-person-ura-postcode-look-up")
    }
    else {
        response.redirect("/v9/address-pages/gp-person-ura/gp-person-ura-manual")
    }
  })



router.post('/gp-person-ura-postcode-look-up', function(request, response) {
    response.redirect('/v9/address-pages/gp-person-ura/gp-person-ura-choose-address')
})


  router.post('/gp-person-ura-choose-address', function(request, response) {
    response.redirect('/v9/address-pages/gp-person-ura/gp-person-ura-confirm-address')
})

// General partner - person //
// Correspondence Address //

//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/v9/address-pages/gp-person-ca/gp-person-ca-manual', function (req, res) {
    res.render('v9/address-pages/gp-person-ca/gp-person-ca-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });



router.post('/gp-person-ca-where', function(request, response) {

    var gpPersonCAWhere = request.session.data['gpPersonCAWhere']
    if (gpPersonCAWhere == "gpPersonCAUK"){
        response.redirect("/v9/address-pages/gp-person-ca/gp-person-ca-postcode-look-up")
    }
    else {
        response.redirect("/v9/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })



router.post('/gp-person-ca-postcode-look-up', function(request, response) {
    response.redirect('/v9/address-pages/gp-person-ca/gp-person-ca-choose-address')
})


  router.post('/gp-person-ca-choose-address', function(request, response) {
    response.redirect('/v9/address-pages/gp-person-ca/gp-person-ca-confirm-address')
})



// Limited partner - legal entity //

//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/v9/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-manual', function (req, res) {
    res.render('v9/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });


router.post('/lp-legal-entity-poa-where', function(request, response) {

    var lpLegalEntityPOAWhere = request.session.data['lpLegalEntityPOAWhere']
    if (lpLegalEntityPOAWhere == "lpLegalEntityPOAUK"){
        response.redirect("/v9/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-postcode-look-up")
    }
    else {
        response.redirect("/v9/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-manual")
    }
  })



router.post('/lp-legal-entity-poa-postcode-look-up', function(request, response) {
    response.redirect('/v9/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-choose-address')
})


  router.post('/lp-legal-entity-poa-choose-address', function(request, response) {
    response.redirect('/v9/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-confirm-address')
})



// Limited partner - person //
//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/v9/address-pages/lp-person-ura/lp-person-ura-manual', function (req, res) {
    res.render('v9/address-pages/lp-person-ura/lp-person-ura-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });

router.post('/lp-person-ura-where', function(request, response) {

    var lpPersonURAWhere = request.session.data['lpPersonURAWhere']
    if (lpPersonURAWhere == "lpPersonURAUK"){
        response.redirect("/v9/address-pages/lp-person-ura/lp-person-ura-postcode-look-up")
    }
    else {
        response.redirect("/v9/address-pages/lp-person-ura/lp-person-ura-manual")
    }
  })



router.post('/lp-person-ura-postcode-look-up', function(request, response) {
    response.redirect('/v9/address-pages/lp-person-ura/lp-person-ura-choose-address')
})


  router.post('/lp-person-ura-choose-address', function(request, response) {
    response.redirect('/v9/address-pages/lp-person-ura/lp-person-ura-confirm-address')
})

////////////////////////////////
// Confirmation statement //


// Check SIC

router.post('/check-sic', function(request, response) {

    var checkSIC = request.session.data['checkSIC']
    if (checkSIC == "yes"){
        response.redirect("/v9/confirmation-statement/submit-confirmation-statement")
    }
    else {
        response.redirect("/v9/limited-partnership-sic")
    }
  })


  //Before you file

  router.post('/before-you-file', function(request, response) {

    var csInfoCorrect = request.session.data['csInfoCorrect']
    if (csInfoCorrect == "no"){
        response.redirect("/v9/manage/file-confirmation-statement")
    }
    else {
        response.redirect("/v9/confirmation-statement/submit-confirmation-statement")
    }
  })

module.exports=router;