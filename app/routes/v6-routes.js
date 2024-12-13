//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here



// GOV One Login Sign in

  router.post('/gov-onelogin-email', function(request, response) {
    var govOneLoginEmail = request.session.data['govOneLoginEmail']
    if (govOneLoginEmail == "someone@test.com"){
        response.redirect("/v6/not-eligible")
    } 
    else {
        response.redirect("/v6/gov-onelogin-password")
    }
  })


// GOV One Login Check your phone


router.post('/gov-onelogin-enter-code.html', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v6/company-number")
    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("/v6/company-number")
     } 
     else {
        response.redirect("/v6/registration/which-type")
    }
})




  // name ending

  router.post('/which-type', function(request, response) {

    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("/v6/registration/pflp-name")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("/v6/registration/scottish-pflp-name")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("/v6/registration/slp-name")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("/v6/registration/sqp-name")
     } 
     else {
        response.redirect("/v6/registration/lp-name")
    }
})

router.post(['/lp-name', '/pflp-name', '/slp-name', '/sqp-name'], (request, response) => {
    var lpChooseName = request.session.data['lpChooseName'];
    
    if (lpChooseName && lpChooseName.toLowerCase().includes("harrods")) {
        response.redirect("/v6/registration/same-as-name");
    } else if (lpChooseName && lpChooseName.toLowerCase().includes("bank")) {
        response.redirect("/v6/registration/sensitive-name");
    } else {
        response.redirect("/v6/idv-filter");
    }
})
  

//Has the LP done IDV

router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("/v6/idv-no")
  } 
  else {
      response.redirect("/v6/limited-partnership-rea")
  }
})

// LP number confirm - transition or post-transition

router.post('/company-number', function (req, res) {
    res.redirect('/v6/correct-company')
  })


router.post('/correct-company', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v6/limited-partnership-overview-cya")
    } 
    else {
        response.redirect("/v6/transition-start")
    }
  })



//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("/v6/gp-person")
    } else {
        response.redirect("/v6/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    if (addAnotherGP == "addPersonGP"){
        response.redirect("/v6/gp-person")
    } 
    if (addAnotherGP == "addEntityGP"){
        response.redirect("/v6/gp-legal-entity")
    } 
    else {
        response.redirect("/v6/limited-partner-section")
    }
})

//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("/v6/lp-person")
    } else {
        response.redirect("/v6/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {

    var addAnotherLP = request.session.data['addAnotherLP']
    var lpNumber = request.session.data['lpNumber']
    if (addAnotherLP == "addPersonLP"){
        response.redirect("/v6/lp-person")
    } 
   else if (addAnotherLP == "addEntityLP"){
        response.redirect("/v6/lp-legal-entity")
    } 
    else if (lpNumber.startsWith("SL") || lpNumber.startsWith("SG")) {
        response.redirect("/v6/psc-section")
    } 
    else {
        response.redirect("/v6/general-partner-idv")
    }
})



// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('/v6/registration/which-type')
})

// Registration - LP name
router.post('/lp-name', function(request, response) {
    response.redirect('/v6/idv-filter')
})

// Registration - LP statement
//router.post('/lp-statement', function(request, response) {
//   response.redirect('/v6/idv-filter')
//})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v6/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v6/transition-start-page")
    }
    else {
        response.redirect("/v6/post-transition-start-page")
    }
  })

// Start

router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v6/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v6/transition-start-page")
    }
    else {
        response.redirect("/v6/post-transition-start-page")
    }
  })

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    response.redirect('/v6/limited-partnership-ppob')

});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('/v6/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
//router.post('/limited-partnership-roa-confirm-address', function(request, response) {

 //   var registrationOrTransition = request.session.data['registrationOrTransition']
 //   if (registrationOrTransition == "post"){
 //       response.redirect("/v6/filing-confirmation")
 //   } else {
 //       response.redirect("/v6/limited-partnership-ppob")
//   }
//})



//PPOB

router.post('/limited-partnership-ppob', function(request, response) {
    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("/v6/general-partner-section")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("/v6/general-partner-section")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("/v6/limited-partnership-terms")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("/v6/limited-partnership-terms")
     } 
     else {
        response.redirect("/v6/limited-partnership-terms")
    }
})

// Starting new?

router.post('/starting-new', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v6/sign-in")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/starting-new")
    }
    else {
        response.redirect("/starting-new")
    }
  })

// Terms of partnership


router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v6/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v6/transition-start-page")
    }
    else {
        response.redirect("/v6/post-transition-start-page")
    }
  })

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v6/post-check-your-answers")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v6/general-partner-section")
    }
    else {
        response.redirect("/v6/limited-partnership-sic")
    }
})







module.exports=router;