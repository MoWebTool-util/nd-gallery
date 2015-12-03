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
    partial: require('./src/partial.handlebars'),

    align: null,

    position: 'fixed',

    classPrefix: 'ui-gallery',
    items: null,
    index: 0,

    events: {
      'keyup': 'close',
      'click [data-role="close"]': 'close',
      'click [data-role="prev"]': 'prev',
      'click [data-role="next"]': 'next',
      'click [data-role="thumb"]': 'switchTo'
    }
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

  renderPartial: function(items) {
    var index = this.get('index');

    this.$('[data-role="content"]').html(
      this.get('partial')({
        index: index,
        items: items
      })
    );

    this.set('index', -1, {
      silent: true
    });

    this.set('index', index);
  },

  _onRenderItems: function(items) {
    this.renderPartial(items);
  },

  _onRenderIndex: function(index) {
    var items = this.get('items');
    var $thumbs=  this.$('[data-role="thumbs"]');

    if (!items.length) {
      return;
    }

    if (index >= items.length) {
      index = items.length - 1;
      this.set('index',index);
    }

    // 原图
    this.$('[data-role="origin"]')[0].href = items[index].large;

    // 大图
    this.$('[data-role="image"]')[0].src = items[index].medium;

    // thumbs
    $thumbs
      .children(':eq(' + index + ')')
      .addClass('current')
      .siblings('.current').removeClass('current');

    // pagination
    this.$('[data-role="index"]').text(index + 1);

    this.thumbScroll(index,$thumbs);
  },

  thumbScroll: function(index,$thumbs) {
    index = index || this.get('index');
    $thumbs.scrollLeft
    (
      $thumbs
        .children(':eq(' + index + ')')[0]
        .offsetLeft -8 - this.$('.thumbs-wrap').width()/2
    );
  }

});

module.exports = Gallery;
