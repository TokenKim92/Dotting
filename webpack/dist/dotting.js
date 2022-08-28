/*!
 * Duplication of Image
 * @version 1.0.0 | Sun Aug 28 2022
 * @author Token Kim
 * @license ISC
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dotting"] = factory();
	else
		root["Dotting"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/baseCanvas.js":
/*!***************************!*\
  !*** ./lib/baseCanvas.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BaseCanvas)\n/* harmony export */ });\nclass BaseCanvas {\r\n  static INIT_MODE = -1;\r\n  static SMALL_MODE = 0;\r\n  static REGULAR_MODE = 1;\r\n  static MEDIUM_MODE = 2;\r\n  static LARGE_MODE = 3;\r\n\r\n  #canvas;\r\n  #ctx;\r\n  #stageWidth;\r\n  #stageHeight;\r\n  #isFull;\r\n\r\n  constructor(isFull = false) {\r\n    this.#canvas = document.createElement('canvas');\r\n    this.#canvas.style.position = 'absolute';\r\n    this.#ctx = this.#canvas.getContext('2d');\r\n    document.body.append(this.#canvas);\r\n\r\n    this.#isFull = isFull;\r\n    if (this.#isFull) {\r\n      this.#canvas.style.width = '100%';\r\n      this.#canvas.style.height = '100%';\r\n    }\r\n\r\n    //this.#canvas.style.opacity = '0';\r\n  }\r\n\r\n  resize(width = 0, height = 0) {\r\n    this.#stageWidth = width === 0 ? document.body.clientWidth : width;\r\n    this.#stageHeight = height === 0 ? document.body.clientHeight : height;\r\n\r\n    this.#canvas.width = this.#stageWidth;\r\n    this.#canvas.height = this.#stageHeight;\r\n  }\r\n\r\n  clearCanvas() {\r\n    this.#ctx.clearRect(0, 0, this.#stageWidth, this.#stageHeight);\r\n  }\r\n\r\n  clearRect(x, y, w, h) {\r\n    this.#ctx.clearRect(x, y, w, h);\r\n  }\r\n\r\n  addEventToCanvas(type, listener) {\r\n    this.#canvas.addEventListener(type, listener);\r\n  }\r\n\r\n  removeEventFromCanvas(type, listener) {\r\n    this.#canvas.removeEventListener(type, listener);\r\n  }\r\n\r\n  bringToStage() {\r\n    document.body.append(this.#canvas);\r\n  }\r\n\r\n  removeFromStage() {\r\n    this.clearCanvas();\r\n    document.body.removeChild(this.#canvas);\r\n  }\r\n\r\n  setPosition(x, y) {\r\n    if (this.#isFull) {\r\n      throw new Error('Positioning is not possible in full screen mode.');\r\n    }\r\n\r\n    this.#canvas.style.left = `${x}px`;\r\n    this.#canvas.style.top = `${y}px`;\r\n  }\r\n\r\n  hide(millisecond = 0, mode = 'ease') {\r\n    if (!millisecond) {\r\n      this.#canvas.style.opacity = '0';\r\n      return;\r\n    }\r\n\r\n    setTimeout(() => {\r\n      this.#canvas.style.opacity = '0';\r\n      this.#canvas.style.transition = `opacity ${millisecond}ms  ${mode}`;\r\n      setTimeout(() => (this.#canvas.style.transition = ''), millisecond);\r\n    }, millisecond);\r\n  }\r\n\r\n  show(millisecond = 0, mode = 'ease') {\r\n    if (!millisecond) {\r\n      this.#canvas.style.opacity = '1';\r\n      return;\r\n    }\r\n\r\n    setTimeout(() => {\r\n      this.#canvas.style.opacity = '1';\r\n      this.#canvas.style.transition = `opacity ${millisecond}ms  ${mode}`;\r\n      setTimeout(() => (this.#canvas.style.transition = ''), millisecond);\r\n    }, millisecond);\r\n  }\r\n\r\n  get stageWidth() {\r\n    return this.#stageWidth;\r\n  }\r\n\r\n  get stageHeight() {\r\n    return this.#stageHeight;\r\n  }\r\n\r\n  get ctx() {\r\n    return this.#ctx;\r\n  }\r\n\r\n  get isMatchMedia() {\r\n    return this.sizeMode === BaseCanvas.SMALL_MODE;\r\n  }\r\n\r\n  get isHeighResolution() {\r\n    return this.sizeMode === BaseCanvas.LARGE_MODE;\r\n  }\r\n\r\n  get sizeMode() {\r\n    const canvasSizeModes = [\r\n      { mode: BaseCanvas.SMALL_MODE, size: 768 },\r\n      { mode: BaseCanvas.REGULAR_MODE, size: 1374 },\r\n      { mode: BaseCanvas.MEDIUM_MODE, size: 1980 },\r\n      { mode: BaseCanvas.LARGE_MODE, size: 3840 },\r\n    ];\r\n\r\n    const sizeModeIndex = \r\n      canvasSizeModes\r\n        .filter((sizeMode) => !window.matchMedia(`(max-width: ${sizeMode.size}px)`).matches)\r\n        .length; // prettier-ignore\r\n\r\n    return canvasSizeModes[sizeModeIndex].mode;\r\n  }\r\n\r\n  set backgroundColor(color) {\r\n    this.#canvas.style.background = color;\r\n  }\r\n\r\n  set borderRadius(pixel) {\r\n    this.#canvas.style.borderRadius = `${pixel}px`;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./lib/baseCanvas.js?");

/***/ }),

/***/ "./lib/fontFormat.js":
/*!***************************!*\
  !*** ./lib/fontFormat.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FontFormat)\n/* harmony export */ });\nclass FontFormat {\r\n  #width;\r\n  #size;\r\n  #name;\r\n\r\n  constructor(width, size, name) {\r\n    this.#width = width;\r\n    this.#size = size;\r\n    this.#name = name;\r\n  }\r\n\r\n  get width() {\r\n    return this.#width();\r\n  }\r\n\r\n  get size() {\r\n    return this.#width();\r\n  }\r\n\r\n  get size() {\r\n    return this.#width();\r\n  }\r\n\r\n  get font() {\r\n    return `${this.#width} ${this.#size}px ${this.#name}`; // prettier-ignore\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./lib/fontFormat.js?");

/***/ }),

/***/ "./lib/watermark.js":
/*!**************************!*\
  !*** ./lib/watermark.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Watermark)\n/* harmony export */ });\n/* harmony import */ var _baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseCanvas.js */ \"./lib/baseCanvas.js\");\n/* harmony import */ var _fontFormat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fontFormat.js */ \"./lib/fontFormat.js\");\n\r\n\r\n\r\nclass Watermark extends _baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  static FONT_WIDTH = 600;\r\n  static POS_Y = 50;\r\n\r\n  #text = 0;\r\n  #fontName;\r\n  #color;\r\n\r\n  constructor(text, fontName, color = 'rgb(255,255,255)') {\r\n    super();\r\n\r\n    this.#text = text;\r\n    this.#fontName = fontName;\r\n    this.#color = color;\r\n\r\n    this.#init();\r\n  }\r\n\r\n  resize() {\r\n    super.resize();\r\n\r\n    this.#init();\r\n  }\r\n\r\n  #init() {\r\n    const fontFormat = new _fontFormat_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\r\n      Watermark.FONT_WIDTH,\r\n      this.#fontSize,\r\n      this.#fontName\r\n    );\r\n\r\n    this.ctx.font = fontFormat.font;\r\n    this.ctx.fillStyle = this.#color;\r\n    this.ctx.textBaseline = 'middle';\r\n  }\r\n\r\n  get #fontSize() {\r\n    switch (this.sizeMode) {\r\n      case _baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SMALL_MODE:\r\n        return 20;\r\n      case _baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].REGULAR_MODE:\r\n        return 30;\r\n      case _baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MEDIUM_MODE:\r\n        return 40;\r\n      case _baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].LARGE_MODE:\r\n        return 50;\r\n      default:\r\n        throw new Error('This canvas size is not possible!');\r\n    }\r\n  }\r\n\r\n  draw() {\r\n    const fontPos = this.ctx.measureText(this.#text);\r\n    this.ctx.fillText(\r\n      this.#text,\r\n      (this.stageWidth - fontPos.width) / 2,\r\n      Watermark.POS_Y\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./lib/watermark.js?");

/***/ }),

/***/ "./src/dot.js":
/*!********************!*\
  !*** ./src/dot.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dot)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\r\nclass Dot {\r\n  static BOUNCE = 0.82;\r\n\r\n  #pos = {\r\n    x: 0,\r\n    y: 0,\r\n  };\r\n  #targetRadius;\r\n  #currentRadius;\r\n  #radiusVelocity;\r\n  #pixelSize;\r\n  #pixelHalfSize;\r\n  #color;\r\n\r\n  constructor(pos, radius, pixelSize, color) {\r\n    this.#pos = pos;\r\n\r\n    this.#targetRadius = radius;\r\n    this.#currentRadius = 0;\r\n    this.#radiusVelocity = 0;\r\n    this.#pixelSize = pixelSize;\r\n    this.#pixelHalfSize = pixelSize / 2;\r\n    this.#color = color;\r\n  }\r\n\r\n  animate(ctx) {\r\n    this.#clear(ctx);\r\n    this.#calculateRadius();\r\n    this.#draw(ctx);\r\n  }\r\n\r\n  #clear(ctx) {\r\n    ctx.fillStyle = '#000000';\r\n    ctx.fillRect(\r\n      this.#pos.x - this.#pixelHalfSize,\r\n      this.#pos.y - this.#pixelHalfSize,\r\n      this.#pixelSize,\r\n      this.#pixelSize\r\n    );\r\n  }\r\n\r\n  #calculateRadius() {\r\n    const accel = (this.#targetRadius - this.#currentRadius) / 2;\r\n    this.#radiusVelocity = (this.#radiusVelocity + accel) * Dot.BOUNCE;\r\n    this.#currentRadius += this.#radiusVelocity;\r\n  }\r\n\r\n  #draw(ctx) {\r\n    ctx.beginPath();\r\n    ctx.fillStyle = this.#color;\r\n    ctx.arc(this.#pos.x, this.#pos.y, this.#currentRadius, 0, _utils_js__WEBPACK_IMPORTED_MODULE_0__.PI2);\r\n    ctx.fill();\r\n  }\r\n\r\n  reset() {\r\n    this.#currentRadius = 0;\r\n    this.#radiusVelocity = 0;\r\n  }\r\n\r\n  get pos() {\r\n    return this.#pos;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./src/dot.js?");

/***/ }),

/***/ "./src/dotting.js":
/*!************************!*\
  !*** ./src/dotting.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dotting)\n/* harmony export */ });\n/* harmony import */ var _ripple_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ripple.js */ \"./src/ripple.js\");\n/* harmony import */ var _dot_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dot.js */ \"./src/dot.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _lib_baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/baseCanvas.js */ \"./lib/baseCanvas.js\");\n/* harmony import */ var _lib_watermark_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/watermark.js */ \"./lib/watermark.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Dotting extends _lib_baseCanvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  static RADIUS = 10;\r\n  static PIXEL_SIZE = 24;\r\n  static SMALL_MODE_RADIUS = 4;\r\n  static SMALL_MODE_PIXEL_SIZE = 10;\r\n\r\n  #watermark;\r\n  #radius;\r\n  #pixelSize;\r\n  #dotItems = [];\r\n  #isLoaded = false;\r\n  #image;\r\n  #ripple;\r\n  #imgRect = {\r\n    x: 0,\r\n    y: 0,\r\n    width: 0,\r\n    height: 0,\r\n  };\r\n  #clickedPos = {\r\n    x: 0,\r\n    y: 0,\r\n  };\r\n\r\n  constructor(url, rippleTime = 5, FPS = 60) {\r\n    super(true);\r\n\r\n    this.#watermark = new _lib_watermark_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\r\n      \"Basic code by 'Interactive Developer'\",\r\n      'Arial'\r\n    );\r\n\r\n    this.#ripple = new _ripple_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](rippleTime, FPS);\r\n\r\n    this.#image = new Image();\r\n    this.#image.src = url;\r\n    this.#image.onload = () => {\r\n      this.#isLoaded = true;\r\n      this.resize();\r\n    };\r\n\r\n    this.#initRadiusAndPixelSize();\r\n    this.#watermark.addEventToCanvas('click', this.onClick);\r\n  }\r\n\r\n  bringToStage() {\r\n    super.bringToStage();\r\n    this.#watermark.bringToStage();\r\n    this.#watermark.addEventToCanvas('click', this.onClick);\r\n\r\n    this.clearCanvas();\r\n    this.#dotItems.forEach((dotItem) => dotItem.reset());\r\n    this.#ripple.stop();\r\n    this.#drawImage();\r\n  }\r\n\r\n  removeFromStage() {\r\n    super.removeFromStage();\r\n    this.#watermark.removeFromStage();\r\n    this.#watermark.removeEventFromCanvas('click', this.onClick);\r\n  }\r\n\r\n  resize() {\r\n    super.resize();\r\n    this.#watermark.resize();\r\n    this.#watermark.draw();\r\n\r\n    this.#ripple.stop();\r\n    this.#isLoaded && this.#init();\r\n    this.#initRadiusAndPixelSize();\r\n  }\r\n\r\n  #init() {\r\n    this.#calculateImageRect();\r\n    this.#drawImage();\r\n    this.#initDotItems();\r\n  }\r\n\r\n  #initRadiusAndPixelSize() {\r\n    if (!this.isMatchMedia) {\r\n      this.#radius = Dotting.RADIUS;\r\n      this.#pixelSize = Dotting.PIXEL_SIZE;\r\n    } else {\r\n      this.#radius = Dotting.SMALL_MODE_RADIUS;\r\n      this.#pixelSize = Dotting.SMALL_MODE_PIXEL_SIZE;\r\n    }\r\n  }\r\n\r\n  #calculateImageRect() {\r\n    const stageRatio = this.stageWidth / this.stageHeight;\r\n    const imgRatio = this.#image.width / this.#image.height;\r\n\r\n    if (imgRatio > stageRatio) {\r\n      this.#imgRect.width = this.stageWidth;\r\n      this.#imgRect.height = Math.round(this.#image.height * (this.stageWidth / this.#image.width)); // prettier-ignore\r\n      this.#imgRect.x = 0;\r\n      this.#imgRect.y = Math.round( (this.stageHeight - this.#imgRect.height) / 2); // prettier-ignore\r\n    } else {\r\n      this.#imgRect.width = Math.round(this.#image.width * (this.stageHeight / this.#image.height)); // prettier-ignore\r\n      this.#imgRect.height = this.stageHeight;\r\n      this.#imgRect.x = Math.round((this.stageWidth - this.#imgRect.width) / 2);\r\n      this.#imgRect.y = 0;\r\n    }\r\n  }\r\n\r\n  #initDotItems() {\r\n    const columnCount = Math.ceil(this.stageWidth / this.#pixelSize);\r\n    const rowCount = Math.ceil(this.stageHeight / this.#pixelSize);\r\n    const imgData = this.ctx.getImageData(0, 0, this.stageWidth, this.stageHeight); // prettier-ignore\r\n    let x, y, r, g, b, pixelIndex;\r\n\r\n    this.#dotItems = [];\r\n\r\n    for (let i = 0; i < rowCount; i++) {\r\n      y = (i + 0.5) * this.#pixelSize;\r\n      y = Math.max(Math.min(y, this.stageHeight), 0);\r\n\r\n      for (let j = 0; j < columnCount; j++) {\r\n        x = (j + 0.5) * this.#pixelSize;\r\n        x = Math.max(Math.min(x, this.stageWidth), 0);\r\n\r\n        pixelIndex = (x + y * this.stageWidth) * 4;\r\n        r = imgData.data[pixelIndex + 0];\r\n        g = imgData.data[pixelIndex + 1];\r\n        b = imgData.data[pixelIndex + 2];\r\n\r\n        this.#dotItems.push(\r\n          new _dot_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({x, y}, this.#radius, this.#pixelSize, `rgb(${r}, ${g}, ${b})`)\r\n        ); // prettier-ignore\r\n      }\r\n    }\r\n  }\r\n\r\n  animate() {\r\n    this.#ripple.animate(this.ctx);\r\n\r\n    this.#dotItems.forEach(\r\n      (dotItem) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.collide)(dotItem.pos, this.#clickedPos, this.#ripple.radius) && dotItem.animate(this.ctx)\r\n    ); // prettier-ignore\r\n  }\r\n\r\n  onClick = (clickEvent) => {\r\n    this.clearCanvas();\r\n\r\n    this.#dotItems.forEach((dotItem) => dotItem.reset());\r\n    this.#drawImage();\r\n    this.#clickedPos = { x: clickEvent.offsetX, y: clickEvent.offsetY };\r\n    this.#ripple.init(this.#imgRect, {x:clickEvent.offsetX, y:clickEvent.offsetY}); // prettier-ignore\r\n  };\r\n\r\n  #drawImage() {\r\n    this.ctx.drawImage(\r\n      this.#image,\r\n      0, 0,\r\n      this.#image.width, this.#image.height,\r\n      this.#imgRect.x, this.#imgRect.y,\r\n      this.#imgRect.width, this.#imgRect.height\r\n    ); // prettier-ignore\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./src/dotting.js?");

/***/ }),

/***/ "./src/ripple.js":
/*!***********************!*\
  !*** ./src/ripple.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ripple)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\r\n\r\nclass Ripple {\r\n  #speed;\r\n  #radius = 0;\r\n  #maxRadius = 0;\r\n  #time;\r\n  #FPS;\r\n\r\n  constructor(time, FPS = 60) {\r\n    this.#time = time;\r\n    this.#FPS = FPS;\r\n  }\r\n\r\n  init(imgPos, pos) {\r\n    this.#radius = 0;\r\n    this.#maxRadius = this.#getMaxDistance(imgPos, pos);\r\n    this.#speed = this.#calculateSpeed(this.#maxRadius);\r\n  }\r\n\r\n  animate() {\r\n    this.#isAchieved || (this.#radius += this.#speed);\r\n  }\r\n\r\n  #getMaxDistance(imgPos, pos) {\r\n    const fromLeftTop = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.distance)(imgPos, pos);\r\n    const fromRightTop = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.distance)({x : imgPos.x + imgPos.width, y: imgPos.y}, pos); // prettier-ignore\r\n    const fromLeftBottom = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.distance)({x : imgPos.x, y : imgPos.y + imgPos.height}, pos); // prettier-ignore\r\n    const fromRightBottom = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.distance)({x: imgPos.x + imgPos.width, y: imgPos.y + imgPos.height}, pos); // prettier-ignore\r\n\r\n    return Math.max(fromLeftTop, fromRightTop, fromLeftBottom, fromRightBottom);\r\n  }\r\n\r\n  #calculateSpeed(maxRadius) {\r\n    const FPS_TIME = 1000 / this.#FPS;\r\n    return maxRadius / (FPS_TIME * this.#time);\r\n  }\r\n\r\n  stop() {\r\n    this.#radius = 0;\r\n    this.#maxRadius = 0;\r\n  }\r\n\r\n  get #isAchieved() {\r\n    return this.#radius >= this.#maxRadius;\r\n  }\r\n\r\n  get radius() {\r\n    return this.#radius;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./src/ripple.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PI2\": () => (/* binding */ PI2),\n/* harmony export */   \"collide\": () => (/* binding */ collide),\n/* harmony export */   \"distance\": () => (/* binding */ distance),\n/* harmony export */   \"getBWValue\": () => (/* binding */ getBWValue)\n/* harmony export */ });\nconst PI2 = Math.PI * 2;\r\n\r\nfunction distance(pos1, pos2) {\r\n  const x = pos2.x - pos1.x;\r\n  const y = pos2.y - pos1.y;\r\n\r\n  return Math.sqrt(x * x + y * y);\r\n}\r\n\r\nfunction collide(pos1, pos2, radius) {\r\n  return distance(pos1, pos2) <= radius;\r\n}\r\n\r\nfunction getBWValue(r, g, b, isReversed) {\r\n  const detect = 2;\r\n  if (!isReversed) {\r\n    return 255 - Math.floor((r + g + b) / detect);\r\n  } else {\r\n    return Math.floor((r + g + b) / detect);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Dotting/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/dotting.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});