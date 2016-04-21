'use strict'

// var $ = require('nd-jquery')
var chai = require('chai')
var sinonChai = require('sinon-chai')
var Gallery = require('../index')
var $ = require('nd-jquery')
var expect = chai.expect
// var sinon = window.sinon

chai.use(sinonChai)

/*globals describe,it,after*/
describe('Gallery', function() {
  it('new Gallery', function() {
    expect(Gallery).to.be.a('function')
    expect(new Gallery).to.be.a('object')
  })
})

var gallery
var items
function getCurIndex() {
  return $('.thumbs-wrap .thumbs').find('.current').index()
}

function renderByType(type) {
  if (type === 0) {
    items = []
    gallery = new Gallery({
      zIndex: 2,
      items: items
    }).render()
  } else if (type === 1) {
    items = [{
      id: 'c6bdfb54-d746-4463-8e5b-1ba5761119b5',
      large: 'http://betacs.101.com/v0.1/download?dentryId=c6bdfb54-d746-4463-8e5b-1ba5761119b5',
      medium: 'http://betacs.101.com/v0.1/download?dentryId=c6bdfb54-d746-4463-8e5b-1ba5761119b5&size=640',
      small: 'http://betacs.101.com/v0.1/download?dentryId=c6bdfb54-d746-4463-8e5b-1ba5761119b5&size=80',
      title: '2016-03-23 16:00:39',
    }, {
      id: '5fbcd401-8764-4564-957c-289b5236acd1',
      large: 'http://betacs.101.com/v0.1/download?dentryId=5fbcd401-8764-4564-957c-289b5236acd1',
      medium: 'http://betacs.101.com/v0.1/download?dentryId=5fbcd401-8764-4564-957c-289b5236acd1&size=640',
      small: 'http://betacs.101.com/v0.1/download?dentryId=5fbcd401-8764-4564-957c-289b5236acd1&size=80',
      title: '2016-03-23 16:00:38',
    }]
    gallery = new Gallery({
      zIndex: 2,
      index: 3,
      items: items
    }).render()
  } else if (type === 2) {
    items = [{
      id: 'c6bdfb54-d746-4463-8e5b-1ba5761119b5',
      large: 'http://betacs.101.com/v0.1/download?dentryId=c6bdfb54-d746-4463-8e5b-1ba5761119b5',
      medium: 'http://betacs.101.com/v0.1/download?dentryId=c6bdfb54-d746-4463-8e5b-1ba5761119b5&size=640',
      small: 'http://betacs.101.com/v0.1/download?dentryId=c6bdfb54-d746-4463-8e5b-1ba5761119b5&size=80',
      title: '2016-03-23 16:00:39',
    }, {
      id: '5fbcd401-8764-4564-957c-289b5236acd1',
      large: 'http://betacs.101.com/v0.1/download?dentryId=5fbcd401-8764-4564-957c-289b5236acd1',
      medium: 'http://betacs.101.com/v0.1/download?dentryId=5fbcd401-8764-4564-957c-289b5236acd1&size=640',
      small: 'http://betacs.101.com/v0.1/download?dentryId=5fbcd401-8764-4564-957c-289b5236acd1&size=80',
      title: '2016-03-23 16:00:38',
    }]
    gallery = new Gallery({
      zIndex: 2,
      items: items
    }).render()
  }
}

describe('show/hide', function() {
  after(function() {
    gallery.destroy()
  })
  it('show，显示gallery close方法,隐藏gallery', function() {
    //传入空 显示
    renderByType(0)
    $(gallery).trigger('show')
    expect($('.ui-gallery').css('display')).to.equal('block')
    gallery.destroy()

    //传入非法index 显示
    renderByType(1)
    $(gallery).trigger('show')
    expect($('.ui-gallery').css('display')).to.equal('block')
    gallery.destroy()

    //传入正常 显示
    renderByType(2)
    $(gallery).trigger('show')
    expect($('.ui-gallery').css('display')).to.equal('block')

    //点击关闭-close
    var e = {}
    gallery.close(e)
    expect($('.ui-gallery').css('display')).to.equal('none')

    //按下ESC-close
    $(gallery).trigger('show')
    e.keyCode = 26
    gallery.close(e)
    expect($('.ui-gallery').css('display')).to.equal('block')

    e.keyCode = 27
    gallery.close(e)
    expect($('.ui-gallery').css('display')).to.equal('none')

  })
})

describe('next/prev', function() {
  after(function() {
    gallery.destroy()
  })
  it('选择上一张下一张某一张 跳转', function() {
    //两张图片
    renderByType(2)
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


  })
})
