'use strict'

var $ = require('nd-jquery')
var chai = require('chai')
// var sinonChai = require('sinon-chai')
var Gallery = require('../index')
var expect = chai.expect
// var sinon = window.sinon

// chai.use(sinonChai)

/* globals describe,it,afterEach */

var BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

function createGallery(type) {
  if (type === 0) {
    return new Gallery({
      zIndex: 2,
      items: []
    }).render()
  } else {
    return new Gallery({
      zIndex: 2,
      index: type === 1 ? 3 : 0,
      items: [{
        id: 'c6bdfb54-d746-4463-8e5b-1ba5761119b5',
        large: BLANK_IMAGE,
        medium: BLANK_IMAGE,
        small: BLANK_IMAGE,
        title: '2016-03-23 16:00:39'
      }, {
        id: '5fbcd401-8764-4564-957c-289b5236acd1',
        large: BLANK_IMAGE,
        medium: BLANK_IMAGE,
        small: BLANK_IMAGE,
        title: '2016-03-23 16:00:38'
      }]
    }).render()
  }
}

describe('Gallery', function() {
  it('new Gallery', function() {
    expect(Gallery).to.be.a('function')
    expect(new Gallery).to.be.a('object')
  })
})

describe('show/hide', function() {
  var gallery

  afterEach(function() {
    gallery.destroy()
  })

  it('默认 index', function() {
    gallery = createGallery(0)
    $(gallery).trigger('show')
    expect($('.ui-gallery').css('display')).to.equal('block')
  })

  it('非法 index', function() {
    gallery = createGallery(1)
    $(gallery).trigger('show')
    expect($('.ui-gallery').css('display')).to.equal('block')
  })

  it('正常 index', function() {
    gallery = createGallery(2)
    $(gallery).trigger('show')
    expect($('.ui-gallery').css('display')).to.equal('block')

    // 点击关闭-close
    gallery.close({})
    expect($('.ui-gallery').css('display')).to.equal('none')

    $(gallery).trigger('show')
    // fake some key
    gallery.close({
      keyCode: 26
    })
    expect($('.ui-gallery').css('display')).to.equal('block')

    // fake esc
    gallery.close({
      keyCode: 27
    })
    expect($('.ui-gallery').css('display')).to.equal('none')
  })
})

describe('next/prev', function() {
  it('选择上一张下一张某一张正确跳转', function() {
    function getCurIndex() {
      return $('.thumbs-wrap .thumbs').find('.current').index()
    }
    // 两张图片
    var gallery = createGallery(2)
    var length = $('.thumbs-wrap .thumbs li').length
    var curIndex = getCurIndex()
    gallery.prev()
    var prevIndex = getCurIndex()
    if (curIndex === 0) {
      expect(prevIndex).to.equal(length - 1)
    } else {
      expect(prevIndex).to.equal(curIndex - 1)
    }

    var curIndex = getCurIndex()
    gallery.next()
    var nextIndex = getCurIndex()
    if (curIndex === length - 1) {
      expect(nextIndex).to.equal(0)
    } else {
      expect(nextIndex).to.equal(curIndex + 1)
    }

    for (var i = 0; i < length; i++) {
      $('[data-role="thumb"][data-index="' + i + '"]').trigger('click')
      expect(getCurIndex()).to.equal(i)
    }
    gallery.destroy()
  })
})
