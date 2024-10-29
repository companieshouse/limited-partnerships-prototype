//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here



// Sign in
 router.post('/sign-in', function(request, response) {

    var email = request.session.data['email']
    if (email == "someone@test.com"){
         response.redirect("/v5/not-eligible")
     } 
    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "registration"){
        response.redirect("/v5/registration/in-scotland")
    } 
    else {
        response.redirect("/v5/company-number")
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
        response.redirect("/v5/auth-code")
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
        response.redirect("/v5/general-partner-idv")
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
        response.redirect("/v5/check-your-answers")
    }
})



// Registration - in Scotland or not
router.post('/in-scotland', function(request, response) {
    response.redirect('/v5/registration/which-type')
})

// Registration - LP name
router.post('/lp-name', function(request, response) {
    response.redirect('/v5/registration/lp-statement')
})

// Registration - LP statement
router.post('/lp-statement', function(request, response) {
    response.redirect('/v5/idv-filter')
})


// Choose test scenario - registration or transition
router.post('/registration-or-transition', function(request, response) {

var registrationOrTransition = request.session.data['registrationOrTransition']
if (registrationOrTransition == "registration"){
    response.redirect("/v5/start")
} else {
    response.redirect("/v5/main-start-page")
}
})

//Registered office address (postcode look-up)
router.post('/limited-partnership-roa', function(request, response) {
    const propertyNumber = request.body.propertyNumber;
    const addressPostcode = request.body.addressPostcode;

    if (propertyNumber && addressPostcode) {
        response.redirect('/v5/limited-partnership-roa-confirm-address');
    } else if (!propertyNumber && addressPostcode) {
        response.redirect('/v5/limited-partnership-roa-choose-address');
    } else {
        // Optionally handle the case where neither propertyNumber nor addressPostcode are provided
        response.redirect('/v5/limited-partnership-roa');
    }
});

//Registered office address (choose address)
router.post('/limited-partnership-roa-choose-address', function(request, response) {
    response.redirect('/v5/limited-partnership-roa-confirm-address')
})

//Registered office address (confirm address)
router.post('/limited-partnership-roa-confirm-address', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v5/filing-confirmation")
    } else {
        response.redirect("/v5/limited-partnership-ppob")
    }
})



//PPOB

router.post('/limited-partnership-ppob', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v5/filing-confirmation")
    }     
    else if (registrationOrTransition == "transition"){
         response.redirect("/v5//limited-partnership-sic")
     } 
     else {
        response.redirect("/v5/limited-partnership-terms")
    }
})

// Terms of partnership

router.post('/limited-partnership-terms', function(request, response) {

    var registrationOrTransition = request.session.data['registrationOrTransition']
    if (registrationOrTransition == "post"){
        response.redirect("/v5/filing-confirmation")
    } else {
        response.redirect("/v5/limited-partnership-sic")
    }
})


module.exports=router;