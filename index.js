/**
 * @module: nd-gallery
 * @author: crossjs <liwenfu@crossjs.com> - 2015-01-22 13:36:51
 */

'use strict';

var $ = require('jquery'),
  Overlay = require('nd-overlay'),
  Template = require('nd-template'),
  ndImage = require('nd-image');

var Gallery = module.exports = Overlay.extend({

  Implements: Template,

  attrs: {
    template: require('./src/gallery.handlebars'),

    align: null,
    position: 'fixed',
    width: 1024,

    classPrefix: 'ui-gallery',
    index: 0,
    items: [],

    events: {
      'keyup': 'close',
      'click [data-role=close]': 'close',
      'click [data-role=prev]': 'prev',
      'click [data-role=next]': 'next',
      'click [data-role=thumb]': 'switchTo'
    },

    afterRender: '_resizeThumbs',
    afterShow: '_focus',

    beforeShow: '_beforeShow',
    afterHide: '_afterHide'
  },

  parseElement: function() {
    this.set('model', {
      classPrefix: this.get('classPrefix'),
      index: this.get('index'),
      items: this.get('items')
    });

    Gallery.superclass.parseElement.call(this);
  },

  setup: function() {
    var timeout, that = this;

    $(window).on('resize', function() {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function() {
        that._beforeShow();
      }, 80);
    });

    // Gallery.superclass.setup.call(this);
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

  _resizeThumbs: function() {
    this.$('[data-role=thumb]').each(function(i, img) {
      ndImage.load({
        node: img,
        // url: img.src,

        ready: function() {
          // 缩放
          ndImage.zoom({
            node: img,
            width: this.width,
            height: this.height,
            maxWidth: 60,
            maxHeight: 60,
            overflow: true,

            callback: function(w, h) {
              this.width = w;
              this.height = h;
            }
          });

          // 居中
          ndImage.center({
            node: img,
            width: 60,
            height: 60,

            callback: function(t, l) {
              $(this).css({
                marginTop: t,
                marginLeft: l
              });
            }
          });
        }
      });
    });
  },

  _focus: function() {
    this.element[0].focus();
  },

  _afterHide: function() {
    document.documentElement.style.overflow = '';
  },

  _beforeShow: function() {
    document.documentElement.style.overflow = 'hidden';
    this.set('height', Math.max(400, Math.min(768, $(window).height())));
  },

  _onRenderWidth: function(width) {
    this.$('[data-role=content]').width(width);
  },

  _onRenderHeight: function(height) {
    this.$('[data-role=content]').css({
      top: Math.max(0, ($(window).height() - height) / 2),
      height: height
    });

    this.$('[data-role=image-wrap]').height(height - 90);

    this._onRenderIndex(this.get('index'));
  },

  _onRenderIndex: function(index) {
    var that = this,
      width = this.get('width'),
      height = this.get('height'),
      items = this.get('items'),
      img = this.$('[data-role=image]')[0];

    if (!width || !height) {
      return setTimeout(function() {
        that._onRenderIndex(index);
      }, 80);
    }

    height -= 90;

    // 原图/大图
    this.$('[data-role=origin]')[0].href = items[index].large;

    // 展示区域先加载小图
    img.src = items[index].small;

    // 缩放
    ndImage.zoom({
      node: img,
      maxWidth: width,
      maxHeight: height,
      fixed: true,

      callback: function(w, h) {
        this.width = w;
        this.height = h;
      }
    });

    // 居中
    ndImage.center({
      node: img,
      width: width,
      height: height,

      callback: function(t, l) {
        $(this).css({
          marginTop: t,
          marginLeft: l
        });
      }
    });

    // 加载中图
    (function(index) {
      ndImage.load({
        url: items[index].medium,

        ready: function() {
          // 缩放
          ndImage.zoom({
            node: img,
            width: this.width,
            height: this.height,
            maxWidth: width,
            maxHeight: height,
            fixed: true,

            callback: function(w, h) {
              this.width = w;
              this.height = h;
            }
          });

          // 居中
          ndImage.center({
            node: img,
            width: width,
            height: height,

            callback: function(t, l) {
              $(this).css({
                marginTop: t,
                marginLeft: l
              });
            }
          });
        },

        load: function() {
          if (index === that.get('index')) {
            img.src = items[index].medium;
          }
        }
      });
    })(index);

    // thumbs
    this.$('[data-role=thumbs]')
      .children(':eq(' + index + ')').addClass('current')
      .siblings('.current').removeClass('current');

    // pagination
    this.$('[data-role=index]').text(index + 1);
  }

});
