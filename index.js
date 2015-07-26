/**
 * @module Gallery
 * @author crossjs <liwenfu@crossjs.com>
 */

'use strict';

var Overlay = require('nd-overlay');
var Template = require('nd-template');

var Gallery = Overlay.extend({

  Implements: [Template],

  attrs: {
    template: require('./src/gallery.handlebars'),

    align: null,

    position: 'fixed',

    classPrefix: 'ui-gallery',
    index: 0,
    items: [],

    events: {
      'keyup': 'close',
      'click [data-role="close"]': 'close',
      'click [data-role="prev"]': 'prev',
      'click [data-role="next"]': 'next',
      'click [data-role="thumb"]': 'switchTo'
    }
  },

  initAttrs: function(config) {
    Gallery.superclass.initAttrs.call(this, config);

    this.set('model', {
      index: this.get('index'),
      items: this.get('items')
    });
  },

  close: function(e) {
    if (!e.keyCode || e.keyCode === 27) {
      this.hide();
    }
  },

  prev: function() {
    this._switchTo(+this.get('index') - 1);
  },

  next: function() {
    this._switchTo(+this.get('index') + 1);
  },

  switchTo: function(e) {
    this._switchTo(+e.target.getAttribute('data-index'));
  },

  _switchTo: function(num) {
    var max = this.get('items').length - 1;

    if (num < 0) {
      num = max;
    } else if (num > max) {
      num = 0;
    }

    this.set('index', num);
  },

  _onRenderIndex: function(index) {
    var items = this.get('items');

    if (!items.length) {
      return;
    }

    // 原图
    this.$('[data-role="origin"]')[0].href = items[index].large;

    // 大图
    this.$('[data-role="image"]')[0].src = items[index].medium;

    // thumbs
    this.$('[data-role="thumbs"]')
      .children(':eq(' + index + ')')
      .addClass('current')
      .siblings('.current').removeClass('current')
      .end().get(0).scrollIntoViewIfNeeded();

    // pagination
    this.$('[data-role="index"]').text(index + 1);
  }

});

module.exports = Gallery;
