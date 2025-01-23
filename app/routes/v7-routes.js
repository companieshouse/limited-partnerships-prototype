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
        response.redirect("/v7/not-eligible")
    } 
    else {
        response.redirect("/v7/gov-onelogin-password")
    }
  })


// GOV One Login Check your phone


router.post('/gov-onelogin-enter-code', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v7/company-number")
    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("/v7/company-number")
     } 
     else {
        response.redirect("/v7/registration/which-type")
    }
})




  // name ending

  router.post('/which-type', function(request, response) {

    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("/v7/registration/pflp-name")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("/v7/registration/scottish-pflp-name")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("/v7/registration/slp-name")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("/v7/registration/sqp-name")
     } 
     else {
        response.redirect("/v7/registration/lp-name")
    }
})

router.post(['/lp-name', '/pflp-name', '/slp-name', '/sqp-name'], (request, response) => {
    var lpChooseName = request.session.data['lpChooseName'];
    
    if (lpChooseName && lpChooseName.toLowerCase().includes("harrods")) {
        response.redirect("/v7/registration/same-as-name");
    } else if (lpChooseName && lpChooseName.toLowerCase().includes("bank")) {
        response.redirect("/v7/registration/sensitive-name");
    } else {
        response.redirect("/v7//limited-partnership-rea");
    }
})
  

//Has the LP done IDV

router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("/v7/idv-no")
  } 
  else {
      response.redirect("/v7/limited-partnership-rea")
  }
})

// LP number confirm - transition or post-transition

router.post('/company-number', function (req, res) {
    res.redirect('/v7/correct-company')
  })


router.post('/correct-company', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v7/limited-partnership-overview-cya")
    } 
    else {
        response.redirect("/v7/limited-partnership-rea")
    }
  })



  router.post('/limited-partnership-rea', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v7/limited-partnership-jurisdiction")
    } 
    else {
        response.redirect("/v7/limited-partnership-roa")
    }
  })

  router.post('/company-number', function (req, res) {
    res.redirect('/v7/correct-company')
  })




//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("/v7/gp-person")
    } else {
        response.redirect("/v7/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    if (addAnotherGP == "addPersonGP"){
        response.redirect("/v7/gp-person")
    } 
    if (addAnotherGP == "addEntityGP"){
        response.redirect("/v7/gp-legal-entity")
    } 
    else {
        response.redirect("/v7/limited-partner-section")
    }
})

//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("/v7/lp-person")
    } else {
        response.redirect("/v7/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {

    var addAnotherLP = request.session.data['addAnotherLP']
    var lpNumber = request.session.data['lpNumber']
    if (addAnotherLP == "addPersonLP"){
        response.redirect("/v7/lp-person")
    } 
   else if (addAnotherLP == "addEntityLP"){
        response.redirect("/v7/lp-legal-entity")
    } 
    else if (lpNumber.startsWith("SL") || lpNumber.startsWith("SG")) {
       // response.redirect("/v7/psc-section")
       response.redirect("/v7/check-your-answers")

    } 
    else {
        response.redirect("/v7/check-your-answers")
    }
})



// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('/v7/registration/which-type')
})

// Registration - LP name
router.post('/lp-name', function(request, response) {
    response.redirect('/v7/idv-filter')
})

// Registration - LP statement
//router.post('/lp-statement', function(request, response) {
//   response.redirect('/v7/idv-filter')
//})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v7/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v7/transition-start-page")
    }
    else {
        response.redirect("/v7/post-transition-start-page")
    }
  })

// Start

router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v7/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v7/transition-start-page")
    }
    else {
        response.redirect("/v7/post-transition-start-page")
    }
  })

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    response.redirect('/v7/limited-partnership-roa-choose-address')
});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('/v7/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
router.post('/limited-partnership-roa-confirm-address', function(request, response) {

   var registrationOrTransition = request.session.data['registrationOrTransition']
   if (registrationOrTransition == "post"){
      response.redirect("/v7/filing-confirmation")
   }
      else if (registrationOrTransition == "transition"){
        response.redirect("/v7/general-partner-section")
   } 
   else {
      response.redirect("/v7/limited-partnership-ppob")
  }
})



//PPOB

router.post('/limited-partnership-ppob', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition'];
    var registerType = request.session.data['registerType'];

    if (registrationOrTransition === "transition") {
        response.redirect("/v7/general-partner-section");
    } else if (registerType === "RegisterPflp" || registerType === "RegisterPflpSco") {
        response.redirect("/v7/general-partner-section");
    } else if (registerType === "registerSlp" || registerType === "RegisterSqp") {
        response.redirect("/v7/limited-partnership-terms");
    } else {
        response.redirect("/v7/limited-partnership-terms");
    }
});




// Starting new?

router.post('/starting-new', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v7/sign-in")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v7/sign-in")
    }
    else {
        response.redirect("/v7/sign-in")
    }
  })

// Terms of partnership


router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v7/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v7/transition-start-page")
    }
    else {
        response.redirect("/v7/post-transition-start-page")
    }
  })

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v7/post-check-your-answers")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v7/general-partner-section")
    }
    else {
        response.redirect("/v7/limited-partnership-sic")
    }
})







module.exports=router;