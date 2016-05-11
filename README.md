# nd-gallery

[![Travis](https://img.shields.io/travis/ndfront/nd-gallery.svg?style=flat-square)](https://github.com/ndfront/nd-gallery)
[![Coveralls](https://img.shields.io/coveralls/ndfront/nd-gallery.svg?style=flat-square)](https://github.com/ndfront/nd-gallery)
[![NPM version](https://img.shields.io/npm/v/nd-gallery.svg?style=flat-square)](https://npmjs.org/package/nd-gallery)
[![dependencies](https://david-dm.org/ndfront/nd-gallery.svg?style=flat-square)](https://david-dm.org/ndfront/nd-gallery)
[![devDependency Status](https://david-dm.org/ndfront/nd-gallery/dev-status.svg?style=flat-square)](https://david-dm.org/ndfront/nd-gallery#info=devDependencies)

> 多图幻灯片浏览

## 安装

``` bash
$ npm install nd-gallery --save
```

## 开发

``` bash
# 代码静态检查
$ npm run lint

# 代码静态检查并自动修复
$ npm run lint:fix

# 运行单元测试
$ npm run test

# 热重载模式下运行单元测试
$ npm run test:dev
```

## 使用

``` js
var Gallery = require('nd-gallery');
// use Gallery
new Gallery({
  items: [{
    large: '<URL>',
    medium: '<URL>',
    small: '<URL>',
    title: '<TITLE>'
  }, {
    large: '<URL>',
    medium: '<URL>',
    small: '<URL>',
    title: '<TITLE>'
  }]
}).render()
```
