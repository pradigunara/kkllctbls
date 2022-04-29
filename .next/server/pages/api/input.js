"use strict";
(() => {
var exports = {};
exports.id = 304;
exports.ids = [304];
exports.modules = {

/***/ 1712:
/***/ ((module) => {

module.exports = require("lodash/get");

/***/ }),

/***/ 1546:
/***/ ((module) => {

module.exports = require("lodash/kebabCase");

/***/ }),

/***/ 4298:
/***/ ((module) => {

module.exports = require("lodash/set");

/***/ }),

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7194:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4298);
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1546);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1712);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_5__]);
nanoid__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];







const pt = (...p) => path__WEBPACK_IMPORTED_MODULE_4___default().join(process.cwd(), ...p);

const dbPath = pt('/data/db.json');

const load = () => JSON.parse(fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(dbPath).toString());

const write = db => fs__WEBPACK_IMPORTED_MODULE_3___default().writeFileSync(dbPath, JSON.stringify(db, null, 2));

const writeImg = (base64image, imgPath) => {
  const buffer = new Buffer(base64image, 'base64');
  fs__WEBPACK_IMPORTED_MODULE_3___default().writeFileSync(pt('/public', imgPath), buffer);
};

function handler(req, res) {
  if (req.method !== 'POST' && true) {
    return res.status(200).json({
      message: 'mwahahaha'
    });
  }

  const {
    memberCode,
    eraCode,
    sectionCode,
    name,
    image,
    rounded
  } = req.body;
  fs__WEBPACK_IMPORTED_MODULE_3___default().copyFileSync(dbPath, pt('/data/db.json.bak'));
  const db = load();
  const storagePath = ['cards', memberCode, eraCode, sectionCode];

  const cards = lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(db, storagePath, []);

  const imgPath = `/card/${memberCode}-${eraCode}-${sectionCode}-${lodash_kebabCase__WEBPACK_IMPORTED_MODULE_1___default()(name)}.jpg`;
  cards.push({
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__.nanoid)(),
    code: lodash_kebabCase__WEBPACK_IMPORTED_MODULE_1___default()(name),
    name,
    memberCode,
    eraCode,
    sectionCode,
    img: imgPath,
    rounded
  });

  lodash_set__WEBPACK_IMPORTED_MODULE_0___default()(db, storagePath, cards);

  write(db);
  writeImg(image, imgPath);
  res.status(200).json({
    status: 'OK'
  });
}
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7194));
module.exports = __webpack_exports__;

})();