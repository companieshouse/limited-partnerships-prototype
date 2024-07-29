//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here



//Has the LP done IDV
router.post('/idv-filter', function(request, response) {

  var idvCodes = request.session.data['idvCodes']
  if (idvCodes == "no"){
      response.redirect("/v2/idv-no")
  } 
  else {
      response.redirect("/v2/limited-partnership-info")
  }
})



//general partner choice page - branches to gp legal entity or gp person
router.post('/general-partner-choice', function(request, response) {

    var generalPartner = request.session.data['generalPartner']
    if (generalPartner == "person"){
        response.redirect("/v2/gp-person")
    } else {
        response.redirect("/v2/gp-legal-entity")
    }
})

// add another general partner

router.post('/gp-add-another', function(request, response) {

    var addAnotherGP = request.session.data['addAnotherGP']
    if (addAnotherGP == "addPersonGP"){
        response.redirect("/v2/gp-person")
    } 
    if (addAnotherGP == "addEntityGP"){
        response.redirect("/v2/gp-legal-entity")
    } 
    else {
        response.redirect("/v2/limited-partner-section")
    }
})

//limited partner choice - entity or person

router.post('/limited-partner-choice', function(request, response) {

    var limitedPartner = request.session.data['limitedPartner']
    if (limitedPartner == "person"){
        response.redirect("/v2/lp-person")
    } else {
        response.redirect("/v2/lp-legal-entity")
    }
})

//lp add another
router.post('/lp-add-another', function(request, response) {

    var addAnotherLP = request.session.data['addAnotherLP']
    if (addAnotherLP == "addPersonLP"){
        response.redirect("/v2/lp-person")
    } 
    if (addAnotherLP == "addEntityLP"){
        response.redirect("/v2/lp-legal-entity")
    } 
    else {
        response.redirect("/v2/psc-idv")
    }
})


module.exports=router;