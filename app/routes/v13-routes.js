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




  //CHS sign in 



    router.get('/chs-sign-in-fileForThisCompany', function(request, response) {


        var fileForThisCompany = true
   
        response.redirect("v13/chs/chs-sign-in")
    
  })

// GOV One Login Sign in

  router.post('/gov-onelogin-email', function(request, response) {
   
        response.redirect("v13/gov-onelogin-password")
    
  })


// GOV One Login Check your phone


router.post('/gov-onelogin-enter-code', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){



        // email address check for agent 
            var govOneLoginEmail = request.session.data['govOneLoginEmail']
            if (govOneLoginEmail == "someone@email.com"){
                response.redirect("v13/not-eligible")
            } 



            else {

          

                //check if they have come from search the register 


                        //from search-the-register

                // User has selected File for a company button and now they are signed in 
                if (fileForThisCompany = true){

                    response.redirect("v13/chs/company-info?authorised")
                } 

                //User has selected sign in, but not selected File for a company button
                else {

                    //user has been signed into account
                    var signedIn = request.session.data['signedIn']

                    // sign in and update links are NOT shown
                    response.redirect("v13/chs/company-info?signedIn")


                }

        
                
            }     

    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("v13/starting-new")
     } 
     else {
        response.redirect("v13/starting-new")
    }
})



// sign out registration
router.post('/sign-out', function(request, response) {

    var signingOut = request.session.data['signOut']
    if (signingOut == "yes"){
        response.redirect("v13/signed-out")
    }     
    else if (signingOut == "no"){

    response.redirect("v13/chs/company-info?authorised") 
         
        
    }
})



// Secure register


router.post('/secure-register-filter', function(request, response) {

    var secureRegister = request.session.data['secureRegister']
    if (secureRegister == "yes"){
        response.redirect("v13/use-paper")
    }
    else {
        response.redirect("v13/registration/which-type")
    }
  })



  // name ending

  router.post('/which-type', function(request, response) {

    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("v13/registration/pflp-name")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("v13/registration/scottish-pflp-name")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("v13/registration/slp-name")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("v13/registration/sqp-name")
     } 
     else {
        response.redirect("v13/registration/lp-name")
    }
})

router.post(['/lp-name', '/pflp-name', '/slp-name', '/sqp-name'], (request, response) => {
    var lpChooseName = request.session.data['lpChooseName'];
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    
    if (lpChooseName && lpChooseName.toLowerCase().includes("harrods")) {
        response.redirect("v13/registration/same-as-name");
    } else if (lpChooseName && lpChooseName.toLowerCase().includes("bank")) {
        response.redirect("v13/registration/sensitive-name");
    } else if (request.path === '/lp-name' && registrationOrTransition === "post") {
        response.redirect("manage/date-of-change-lpname-update");
    } else {
        response.redirect("v13/limited-partnership-rea");
    }
});

  

//Has the LP done IDV

router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("v13/idv-no")
  } 
  else {
      response.redirect("v13/limited-partnership-rea")
  }
})

// LP number confirm - transition or post-transition




  router.post('/company-number', function(request, response) {
    var lpNumber = request.session.data['lpNumber']
    if (lpNumber == "LP999999"){
        response.redirect("v13/transition-already-filed")
    } 
    else {
        response.redirect("v13/correct-company")
    }
  })




router.post('/correct-company', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']

    if (registrationOrTransition == "post") {
        response.redirect("v13/manage/limited-partnership-overview-tabs-wf")
    } 
    else if (registrationOrTransition == "cs") {
        response.redirect("v13/manage/file-confirmation-statement")
    }
    else {
        response.redirect("v13/limited-partnership-rea")
    }
})




  router.post('/limited-partnership-rea', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("v13/limited-partnership-jurisdiction")
    } 
    else {
        response.redirect("v13/limited-partnership-roa")
    }
  })

  router.post('/company-number', function (req, res) {
    res.redirect('v13/correct-company')
  })




//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("v13/gp-person")
    } else {
        response.redirect("v13/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    var registrationOrTransition = request.session.data['registrationOrTransition']

    if (registrationOrTransition == "post") {
        response.redirect("v13/manage/confirmation-additional-gp")
    } else if (addAnotherGP == "addPersonGP") {
        response.redirect("v13/gp-person")
    } else if (addAnotherGP == "addEntityGP") {
        response.redirect("v13/gp-legal-entity")
    } else {
        response.redirect("v13/limited-partner-section")
    }

})


//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("v13/lp-person")
    } else {
        response.redirect("v13/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {
    var addAnotherLP = request.session.data['addAnotherLP'];
    var lpNumber = request.session.data['lpNumber'] || "";
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    var registerType = request.session.data['registerType'];

    if (addAnotherLP === "addPersonLP") {
        response.redirect("v13/lp-person");
    } 
    else if (addAnotherLP === "addEntityLP") {
        response.redirect("v13/lp-legal-entity");
    }
    else if (
        registrationOrTransition === "registration" && 
        (registerType === "registerSlp" || registerType === "RegisterPflpSco")
    ) {
        response.redirect("v13/pscs/psc-section");
    }
    else if (
        registrationOrTransition === "post")
     {
        response.redirect("v13/manage/confirmation-add-lp");
    }
    else {
        response.redirect("v13/check-your-answers");
    }
});





// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('v13/registration/which-type')
})




// Registration - LP statement
//router.post('/lp-statement', function(request, response) {
//   response.redirect('/v11/idv-filter')
//})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("v13/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("v13/transition-start-page")
    }
       else if (registrationOrTransition == "cs"){
        response.redirect("v13/confirmation-statement/start")
    }
    else {
        response.redirect("v13/post-transition-guidance")
    }
  })

// Start

router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("v13/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("v13/transition-start-page")
    }
    else {
        response.redirect("v13/post-transition-start-page")
    }
  })

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    response.redirect('v13/limited-partnership-roa-choose-address')
});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('v13/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
router.post('/limited-partnership-roa-confirm-address', function(request, response) {

   var registrationOrTransition = request.session.data['registrationOrTransition']
   if (registrationOrTransition == "post"){
      response.redirect("v13/filing-confirmation")
   }
      else if (registrationOrTransition == "transition"){
        response.redirect("v13/general-partner-section")
   } 
   else {
      response.redirect("v13/limited-partnership-ppob")
  }
})

//Registered office address (manual)
router.post('/limited-partnership-roa-manual', function(request, response) {
  const from = request.session.data['from'];

  if (from === 'roa-update') {
    response.redirect('v13/manage/date-of-change-roa-update'); // replace with your actual route
  } else {
    response.redirect('v13/limited-partnership-roa-confirm-address');
  }
});


//PPOB

router.post('/limited-partnership-ppob', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    var registerType = request.session.data['registerType'];

    if (registrationOrTransition === "transition") {
        response.redirect("v13/general-partner-section");
    } else if (registerType === "RegisterPflp" || registerType === "RegisterPflpSco") {
        response.redirect("general-partner-section");
    } else if (registerType === "registerSlp" || registerType === "RegisterSqp") {
        response.redirect("v13/limited-partnership-ppob-choose-address");
    } else {
        response.redirect("v13/limited-partnership-ppob-choose-address");
    }
});




// Starting new - v13 added Filing history pages into flow

router.post('/starting-new', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    var savedFiling = request.session.data['savedFiling']
    if (registrationOrTransition == "registration"){

        //continue a saved filing
        if (savedFiling == "yes"){

            response.redirect("v13/saved-applications/your-filings")
        
        }

        // no saved filing
        else{

            response.redirect("v13/registration/which-type")

        }

       


    }
    else if (registrationOrTransition == "transition"){
        response.redirect("v13/company-number")
    }
    else {
        response.redirect("v13/company-number")
    }
  })

// Terms of partnership


router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("v13/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("v13/transition-start-page")
    }
    else {
        response.redirect("v13/post-transition-start-page")
    }
  })

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("v13/manage/date-of-change-term-update")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("v13/general-partner-section")
    }
    else {
        response.redirect("v13/limited-partnership-sic-2")
    }
})

/// SIC codes

router.post('/limited-partnership-sic-2', function(request, response) {
    var checkSIC = request.session.data['checkSIC']

    if (checkSIC === "no") {
        response.redirect('v13/confirmation-statement/sic-check')
    } else {
        response.redirect('v13/general-partner-section')
    }
})

/// CS Date

router.post('/confirmation-statement-date', function(request, response) {
    var changeDateOfCS = request.session.data['changeDateOfCS']

    if (changeDateOfCS === "yes") {
        response.redirect('v13/confirmation-statement/check-your-answers-change-cs-date')
    } else {
        response.redirect('v13/confirmation-statement/sic-check')
    }
})

//PSC - Scottish entities only



router.post('/psc-statement', function(request, response) {
    var pscStatement = request.session.data['pscStatement']

if (pscStatement === "no") {
  response.redirect('v13/check-your-answers')
    } else {
        response.redirect('v13/pscs/psc-choice')
    }
})

router.post('/psc-choice', function(request, response) {

    var pscType = request.session.data['pscType']
    if (pscType == "entity"){
        response.redirect("v13/pscs/psc-legal-entity")
    }
    else if (pscType == "orp"){
        response.redirect("v13/pscs/psc-orp")
    }
    else {
        response.redirect("v13/pscs/psc-protected-details")
    }
  })

  // psc protected details

  router.post('/psc-protected-details', function(request, response) {

    response.redirect('v13/pscs/psc-person-alt-1')
    
})



/* Nature of controls - *** Indivual *** control page */

  router.post('/psc-person-alt-nature', function(request, response) {

    response.redirect('v13/pscs/psc-person-alt-nature-individual')
    
})


/* individual */

  router.post('/psc-person-alt-nature-individual', function(request, response) {

    response.redirect('v13/pscs/psc-person-alt-nature-firm')
    
})

/* firm */

  router.post('/psc-person-alt-nature-firm', function(request, response) {

    response.redirect('v13/pscs/psc-person-alt-nature-trust')
    
})


/*  trust */

  router.post('/psc-person-alt-nature-trust', function(request, response) {

    response.redirect('v13/pscs/pscs-addresses/psc-person-ura/psc-person-ura-where')
    
})

/* RLE Nature of controls */

  router.post('/psc-legal-entity-nature', function(request, response) {

    response.redirect('v13/pscs/psc-legal-entity-nature-rle')
    
})


/* entity and individual */

  router.post('/psc-legal-entity-nature-rle', function(request, response) {

    response.redirect('v13/pscs/psc-legal-entity-nature-firm')
    
})

/* entity and firm */

  router.post('/psc-legal-entity-nature-firm', function(request, response) {

    response.redirect('v13/pscs/psc-legal-entity-nature-trust')
    
})


/* entity and trust */

  router.post('/psc-legal-entity-nature-trust', function(request, response) {

    response.redirect('v13/pscs/pscs-addresses/psc-legal-entity-poa/psc-legal-entity-poa-where')
    
})



/* ORP Nature of controls */

  router.post('/psc-orp-nature', function(request, response) {

    response.redirect('v13/pscs/psc-orp-nature-orp')
    
})


/* ORP */

  router.post('/psc-orp-nature-orp', function(request, response) {

    response.redirect('v13/pscs/psc-orp-nature-firm')
    
})

/* ORP and firm */

  router.post('/psc-orp-nature-firm', function(request, response) {

    response.redirect('v13/pscs/psc-orp-nature-trust')
    
})


/* ORP and trust */

  router.post('/psc-orp-nature-trust', function(request, response) {

    response.redirect('v13/pscs/pscs-addresses/psc-orp-poa/psc-orp-poa-where')
    
})


  // add another PSC


  router.post('/psc-add-another', function(request, response) {

    var addAnotherPSC = request.session.data['addAnotherPSC']
    if (addAnotherPSC == "person"){
        response.redirect("v13/pscs/psc-protected-details")
    }
    else if (addAnotherPSC == "entity"){
        response.redirect("v13/pscs/psc-legal-entity")
    }
    else if (addAnotherPSC == "orp"){
        response.redirect("v13/pscs/psc-orp")
    }
    else {
        response.redirect("v13/check-your-answers")
    }
  })




  //Payment Placeholder


router.post('/payment-placeholder', function(request, response) {
  var registrationOrTransition = request.session.data['registrationOrTransition']
  var referrer = request.headers.referer || ''

  if (referrer.includes('?change-type')) {
    response.redirect('v13/manage/confirmation-change-type')
  } 
  else if (referrer.includes('?change-name')) {
    response.redirect('v13/manage/confirmation-change-name')
  }
  else {
    response.redirect("v13/confirmation-page")
  }
})



// Addresses //

// General partner - legal entity //

//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manually entering it
router.get('/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual', function (req, res) {
    res.render('v13/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });



router.post('/gp-legal-entity-poa-where', function(request, response) {

    var gpLegalEntityPOAWhere = request.session.data['gpLegalEntityPOAWhere']
    if (gpLegalEntityPOAWhere == "gpLegalEntityPOAUK"){
        response.redirect("v13/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-postcode-look-up")
    }
    else {
        response.redirect("v13/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual")
    }
  })



router.post('/gp-legal-entity-poa-postcode-look-up', function(request, response) {
    response.redirect('v13/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-choose-address')
})


  router.post('/gp-legal-entity-poa-choose-address', function(request, response) {
    response.redirect('v13/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-confirm-address')
})

// General partner - person //
// URA //
//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/address-pages/gp-person-ura/gp-person-ura-manual', function (req, res) {
    res.render('v13/address-pages/gp-person-ura/gp-person-ura-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });

router.post('/gp-person-ura-where', function(request, response) {

    var gpPersonURAWhere = request.session.data['gpPersonURAWhere']
    if (gpPersonURAWhere == "gpPersonURAUK"){
        response.redirect("v13/address-pages/gp-person-ura/gp-person-ura-postcode-look-up")
    }
    else {
        response.redirect("v13/address-pages/gp-person-ura/gp-person-ura-manual")
    }
  })



router.post('/gp-person-ura-postcode-look-up', function(request, response) {
    response.redirect('v13/address-pages/gp-person-ura/gp-person-ura-choose-address')
})


  router.post('/gp-person-ura-choose-address', function(request, response) {
    response.redirect('v13/address-pages/gp-person-ura/gp-person-ura-confirm-address')
})

// General partner - person //
// Correspondence Address //

//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/address-pages/gp-person-ca/gp-person-ca-manual', function (req, res) {
    res.render('v13/address-pages/gp-person-ca/gp-person-ca-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });



router.post('/gp-person-ca-where', function(request, response) {

    var gpPersonCAWhere = request.session.data['gpPersonCAWhere']
    if (gpPersonCAWhere == "gpPersonCAUK"){
        response.redirect("v13/address-pages/gp-person-ca/gp-person-ca-postcode-look-up")
    }
    else {
        response.redirect("v13/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })



router.post('/gp-person-ca-postcode-look-up', function(request, response) {
    response.redirect('v13/address-pages/gp-person-ca/gp-person-ca-choose-address')
})


  router.post('/gp-person-ca-choose-address', function(request, response) {
    response.redirect('v13/address-pages/gp-person-ca/gp-person-ca-confirm-address')
})



// Limited partner - legal entity //

//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-manual', function (req, res) {
    res.render('v13/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });


router.post('/lp-legal-entity-poa-where', function(request, response) {

    var lpLegalEntityPOAWhere = request.session.data['lpLegalEntityPOAWhere']
    if (lpLegalEntityPOAWhere == "lpLegalEntityPOAUK"){
        response.redirect("v13/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-postcode-look-up")
    }
    else {
        response.redirect("v13/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-manual")
    }
  })



router.post('/lp-legal-entity-poa-postcode-look-up', function(request, response) {
    response.redirect('v13/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-choose-address')
})


  router.post('/lp-legal-entity-poa-choose-address', function(request, response) {
    response.redirect('v13/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-confirm-address')
})



// Limited partner - person //


//update limited partner(person)

router.get('v13/lp-person', function (req, res) {
    res.render('v13/lp-person', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });


  router.post('/lp-person', function(request, response) {


    var registrationOrTransition = request.session.data['registrationOrTransition']
       // Update journey
       if (registrationOrTransition == "post"){
     
        response.redirect("v13/manage/change-lp-ura")
        
       }
       else {

        response.redirect("v13/address-pages/lp-person-ura/lp-person-ura-where")
       }

})








//This GET code is used to preppoluate the values when the user goes from Confirm the address to Manuallu entering it
router.get('v13/address-pages/lp-person-ura/lp-person-ura-manual', function (req, res) {
    res.render('v13/address-pages/lp-person-ura/lp-person-ura-manual', {
      from: req.query.from // This makes `from` available in Nunjucks
    });
  });








router.post('/lp-person-ura-where', function(request, response) {

    var lpPersonURAWhere = request.session.data['lpPersonURAWhere']
    if (lpPersonURAWhere == "lpPersonURAUK"){
        response.redirect("v13/address-pages/lp-person-ura/lp-person-ura-postcode-look-up")
    }
    else {
        response.redirect("v13/address-pages/lp-person-ura/lp-person-ura-manual")
    }
  })



router.post('/lp-person-ura-postcode-look-up', function(request, response) {
    response.redirect('v13/address-pages/lp-person-ura/lp-person-ura-choose-address')
})


  router.post('/lp-person-ura-choose-address', function(request, response) {
    response.redirect('v13/address-pages/lp-person-ura/lp-person-ura-confirm-address')
})

router.post('/lp-person-ura-confirm-address', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("v13/manage/date-of-change-partner-lp-person")
    }
    else {
        response.redirect("v13/lp-add-another")
    }
  })

////////////////////////////////
// Confirmation statement //


// Check SIC

router.post('/check-sic', function(request, response) {

    var checkSIC = request.session.data['checkSIC']
    if (checkSIC == "yes"){
        response.redirect("v13/confirmation-statement/submit-confirmation-statement")
    }
    else {
        response.redirect("v13/limited-partnership-sic-2")
    }
  })


  // Check SIC - TYPEAHEAD VERSION

  router.post('/sic-add', function(request, response) {
    response.redirect('v13/confirmation-statement/sic-check')
})


  //Before you file

  router.post('/before-you-file', function(request, response) {

    var csInfoCorrect = request.session.data['csInfoCorrect']
    if (csInfoCorrect == "no"){
        response.redirect("v13/manage/file-confirmation-statement")
    }
    else {
        response.redirect("v13/confirmation-statement/submit-confirmation-statement")
    }
  })


  //Update a partner address ura

    router.post('/change-ura', function(request, response) {

    var changeURA = request.session.data['changeURA']

    if (changeURA == "yes"){
        response.redirect("v13/address-pages/gp-person-ura/gp-person-ura-where")
    }
    else {

        response.redirect("v13/manage/change-uca")
        // neds to be the radios page response.redirect("/v12/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })

    //Update a partner address uca

    router.post('/change-uca', function(request, response) {

    var changeUCA = request.session.data['changeUCA']

    if (changeUCA == "yes"){
        response.redirect("v13/address-pages/gp-person-ca/gp-person-ca-manual")
    }
    else {

        response.redirect("v13/manage/date-of-change-partner-update")
        // nneds to be the radios page response.redirect("/v12/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })



    //Update a partner address uca

    router.post('/change-lp-ura', function(request, response) {

    var changeLPURA = request.session.data['changeLPURA']

    if (changeLPURA == "yes"){
        response.redirect("v13/address-pages/lp-person-ura/lp-person-ura-where")
    }
    else {

        response.redirect("v13/manage/date-of-change-partner-lp-person")
        // nneds to be the radios page response.redirect("/v12/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })



  

      //Update a partner address uca

    router.post('/change-ppb', function(request, response) {

    var changePPB = request.session.data['changePPB']

    if (changePPB == "yes"){
        response.redirect("v13/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-where")
    }
    else {

        response.redirect("v13/manage/date-of-change-partner-le-update")
        // nneds to be the radios page response.redirect("/v12/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })

      //Update a limited partner principle office address

    router.post('/change-poa', function(request, response) {

    var changePOA = request.session.data['changePOA']

    if (changePOA == "yes"){
        response.redirect("v13/address-pages/lp-legal-entity-poa/lp-legal-entity-poa-where")
    }
    else {

        response.redirect("v13/manage/date-of-change-partner-lp-update")
        // nneds to be the radios page response.redirect("/v12/address-pages/gp-person-ca/gp-person-ca-manual")
    }
  })




module.exports=router;