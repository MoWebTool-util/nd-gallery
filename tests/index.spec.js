'use strict'

// var $ = require('nd-jquery')
var chai = require('chai')
var sinonChai = require('sinon-chai')
var Gallery = require('../index')

var expect = chai.expect
// var sinon = window.sinon

chai.use(sinonChai)

/*globals describe,it*/

describe('Gallery', function() {

  it('new Gallery', function() {
    expect(Gallery).to.be.a('function')
    expect(new Gallery).to.be.a('object')
  })

})
