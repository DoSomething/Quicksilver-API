###*
# ApiController.test.js
###

request = require('supertest')
should = require('should')

###*
# Test API "ping" endpoint.
###
describe 'Requests to the root (/api) path', ->
  it 'GET: Returns a 200 status code', (done) ->
    request(sails.hooks.http.app).get('/api').expect 200, done
    return
  return
  it 'GET: Returns JSON format', (done) ->
    request(sails.hooks.http.app).get('/api').expect 'content-type', /json/, done
    return
  return
