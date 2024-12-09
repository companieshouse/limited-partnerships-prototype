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
        response.redirect("/v5/not-eligible")
    } 
    else {
        response.redirect("/v5/gov-onelogin-password")
    }
  })


// GOV One Login Check your phone


router.post('/gov-onelogin-enter-code.html', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v5/company-number")
    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("/v5/company-number")
     } 
     else {
        response.redirect("/v5/registration/which-type")
    }
})




  // name ending

  router.post('/which-type', function(request, response) {

    var registerType = request.session.data['registerType']
    if (registerType == "RegisterPflp"){
        response.redirect("/v5/registration/pflp-name")
    }  
    else if (registerType == "RegisterPflpSco"){
        response.redirect("/v5/registration/scottish-pflp-name")
     }    
    else if (registerType == "registerSlp"){
        response.redirect("/v5/registration/slp-name")
     } 
     else if (registerType == "RegisterSqp"){
        response.redirect("/v5/registration/sqp-name")
     } 
     else {
        response.redirect("/v5/registration/lp-name")
    }
})

router.post(['/lp-name', '/pflp-name', '/slp-name', '/sqp-name'], (request, response) => {
    var lpChooseName = request.session.data['lpChooseName'];
    
    if (lpChooseName && lpChooseName.toLowerCase().includes("harrods")) {
        response.redirect("/v5/registration/same-as-name");
    } else if (lpChooseName && lpChooseName.toLowerCase().includes("bank")) {
        response.redirect("/v5/registration/sensitive-name");
    } else {
        response.redirect("/v5/idv-filter");
    }
})
  

//Has the LP done IDV

router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("/v5/idv-no")
  } 
  else {
      response.redirect("/v5/limited-partnership-rea")
  }
})

// LP number confirm - transition or post-transition

router.post('/company-number', function (req, res) {
    res.redirect('/v5/correct-company')
  })


router.post('/correct-company', function(request, response) {
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v5/limited-partnership-overview-cya")
    } 
    else {
        response.redirect("/v5/transition-start")
    }
  })



//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("/v5/gp-person")
    } else {
        response.redirect("/v5/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    if (addAnotherGP == "addPersonGP"){
        response.redirect("/v5/gp-person")
    } 
    if (addAnotherGP == "addEntityGP"){
        response.redirect("/v5/gp-legal-entity")
    } 
    else {
        response.redirect("/v5/limited-partner-section")
    }
})

//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("/v5/lp-person")
    } else {
        response.redirect("/v5/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {

    var addAnotherLP = request.session.data['addAnotherLP']
    var lpNumber = request.session.data['lpNumber']
    if (addAnotherLP == "addPersonLP"){
        response.redirect("/v5/lp-person")
    } 
   else if (addAnotherLP == "addEntityLP"){
        response.redirect("/v5/lp-legal-entity")
    } 
    else if (lpNumber.startsWith("SL") || lpNumber.startsWith("SG")) {
        response.redirect("/v5/psc-section")
    } 
    else {
        response.redirect("/v5/general-partner-idv")
    }
})



// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('/v5/registration/which-type')
})

// Registration - LP name
router.post('/lp-name', function(request, response) {
    response.redirect('/v5/idv-filter')
})

// Registration - LP statement
//router.post('/lp-statement', function(request, response) {
//   response.redirect('/v5/idv-filter')
//})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {
    response.redirect('/v5/start')
})

// Start

router.post('/start', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v5/registration/registration-start-page")
    }
    else if (registrationOrTransition == "transition"){
        response.redirect("/v5/transition-start-page")
    }
    else {
        response.redirect("/v5/post-transition-start-page")
    }
  })

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    response.redirect('/v5/limited-partnership-ppob')

});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('/v5/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
//router.post('/limited-partnership-roa-confirm-address', function(request, response) {

 //   var registrationOrTransition = request.session.data['registrationOrTransition']
 //   if (registrationOrTransition == "post"){
 //       response.redirect("/v5/filing-confirmation")
 //   } else {
 //       response.redirect("/v5/limited-partnership-ppob")
//   }
//})



//PPOB

router.post('/limited-partnership-ppob', function(request, response) {
    response.redirect('/v5/limited-partnership-terms')
})

// Terms of partnership

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v5/post-check-your-answers")
    } else {
        response.redirect("/v5/limited-partnership-sic")
    }
})




module.exports=router;