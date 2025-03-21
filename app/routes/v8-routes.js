//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

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
        response.redirect("/v8/not-eligible")
    } 
    else {
        response.redirect("/v8/gov-onelogin-password")
    }
  })


// GOV One Login Check your phone


router.post('/gov-onelogin-enter-code', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v8/company-number")
    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("/v8/starting-new")
     } 
     else {
        response.redirect("/v8/starting-new")
    }
})




  // name ending

  router.post('/which-type', function(request, response) {

    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("/v8/registration/pflp-name")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("/v8/registration/scottish-pflp-name")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("/v8/registration/slp-name")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("/v8/registration/sqp-name")
     } 
     else {
        response.redirect("/v8/registration/lp-name")
    }
})

router.post(['/lp-name', '/pflp-name', '/slp-name', '/sqp-name'], (request, response) => {
    var lpChooseName = request.session.data['lpChooseName'];
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    
    if (lpChooseName && lpChooseName.toLowerCase().includes("harrods")) {
        response.redirect("/v8/registration/same-as-name");
    } else if (lpChooseName && lpChooseName.toLowerCase().includes("bank")) {
        response.redirect("/v8/registration/sensitive-name");
    } else if (request.path === '/lp-name' && registrationOrTransition === "post") {
        response.redirect("/v8/manage/check-your-answers-change-name");
    } else {
        response.redirect("/v8/limited-partnership-rea");
    }
});

  

//Has the LP done IDV

router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("/v8/idv-no")
  } 
  else {
      response.redirect("/v8/limited-partnership-rea")
  }
})

// LP number confirm - transition or post-transition




  router.post('/company-number', function(request, response) {
    var lpNumber = request.session.data['lpNumber']
    if (lpNumber == "LP999999"){
        response.redirect("/v8/transition-already-filed")
    } 
    else {
        response.redirect("/v8/correct-company")
    }
  })




router.post('/correct-company', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v8/manage/limited-partnership-overview-tabs-wf")
    } 
    else {
        response.redirect("/v8/limited-partnership-rea")
    }
  })



  router.post('/limited-partnership-rea', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v8/limited-partnership-jurisdiction")
    } 
    else {
        response.redirect("/v8/limited-partnership-roa")
    }
  })

  router.post('/company-number', function (req, res) {
    res.redirect('/v8/correct-company')
  })




//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("/v8/gp-person")
    } else {
        response.redirect("/v8/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    var registrationOrTransition = request.session.data['registrationOrTransition']

    if (registrationOrTransition == "post") {
        response.redirect("/v8/manage/confirmation-additional-gp")
    } else if (addAnotherGP == "addPersonGP") {
        response.redirect("/v8/gp-person")
    } else if (addAnotherGP == "addEntityGP") {
        response.redirect("/v8/gp-legal-entity")
    } else {
        response.redirect("/v8/limited-partner-section")
    }

})


//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("/v8/lp-person")
    } else {
        response.redirect("/v8/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {

    var addAnotherLP = request.session.data['addAnotherLP']
    var lpNumber = request.session.data['lpNumber']
    if (addAnotherLP == "addPersonLP"){
        response.redirect("/v8/lp-person")
    } 
   else if (addAnotherLP == "addEntityLP"){
        response.redirect("/v8/lp-legal-entity")
    } 
    else if (lpNumber.startsWith("SL") || lpNumber.startsWith("SG")) {
       // response.redirect("/v8/psc-section")
       response.redirect("/v8/check-your-answers")

    } 
    else {
        response.redirect("/v8/check-your-answers")
    }
})



// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('/v8/registration/which-type')
})




// Registration - LP statement
//router.post('/lp-statement', function(request, response) {
//   response.redirect('/v8/idv-filter')
//})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v8/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v8/transition-start-page")
    }
    else {
        response.redirect("/v8/post-transition-start-page")
    }
  })

// Start

router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v8/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v8/transition-start-page")
    }
    else {
        response.redirect("/v8/post-transition-start-page")
    }
  })

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    response.redirect('/v8/limited-partnership-roa-choose-address')
});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('/v8/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
router.post('/limited-partnership-roa-confirm-address', function(request, response) {

   var registrationOrTransition = request.session.data['registrationOrTransition']
   if (registrationOrTransition == "post"){
      response.redirect("/v8/filing-confirmation")
   }
      else if (registrationOrTransition == "transition"){
        response.redirect("/v8/general-partner-section")
   } 
   else {
      response.redirect("/v8/limited-partnership-ppob")
  }
})

//Registered office address (manual)
router.post('/limited-partnership-roa-manual', function(request, response) {
    response.redirect('/v8/limited-partnership-roa-confirm-address')
})


//PPOB

router.post('/limited-partnership-ppob', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    var registerType = request.session.data['registerType'];

    if (registrationOrTransition === "transition") {
        response.redirect("/v8/general-partner-section");
    } else if (registerType === "RegisterPflp" || registerType === "RegisterPflpSco") {
        response.redirect("/v8/general-partner-section");
    } else if (registerType === "registerSlp" || registerType === "RegisterSqp") {
        response.redirect("/v8/limited-partnership-terms");
    } else {
        response.redirect("/v8/limited-partnership-terms");
    }
});




// Starting new?

router.post('/starting-new', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v8/registration/which-type")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v8/company-number")
    }
    else {
        response.redirect("/v8/company-number")
    }
  })

// Terms of partnership


router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v8/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v8/transition-start-page")
    }
    else {
        response.redirect("/v8/post-transition-start-page")
    }
  })

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v8/manage/check-your-answers-change-term")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v8/general-partner-section")
    }
    else {
        response.redirect("/v8/limited-partnership-sic")
    }
})



//PSC - Scottish entities only

router.post('/psc-choice', function(request, response) {

    var psc = request.session.data['psc']
    if (psc == "entity"){
        response.redirect("/v8/pscs/psc-entity")
    }
    else if (psc == "orp"){
        response.redirect("/v8/pscs/psc-orp")
    }
    else {
        response.redirect("/v8/pscs/psc-person")
    }
  })



  //Payment Placeholder


  router.post('/payment-placeholder', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v8/manage/confirmation-change-name")
    }
    else {
        response.redirect("/v8/confirmation-page")
    }
  })


// Addresses //

router.post('/gp-legal-entity-poa-where', function(request, response) {

    var gpLegalEntityPOAWhere = request.session.data['gpLegalEntityPOAWhere']
    if (gpLegalEntityPOAWhere == "gpLegalEntityPOAUK"){
        response.redirect("/v8/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-postcode-look-up")
    }
    else {
        response.redirect("/v8/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-manual")
    }
  })


  //general partner's principal office address 
router.post('/gp-legal-entity-poa-postcode-look-up', function(request, response) {
    response.redirect('/v8/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-choose-address')
})

  //general partner's principal office address 
  router.post('/gp-legal-entity-poa-choose-address', function(request, response) {
    response.redirect('/v8/address-pages/gp-legal-entity-poa/gp-legal-entity-poa-confirm-address')
})


module.exports=router;