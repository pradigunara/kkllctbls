"use strict";
(() => {
var exports = {};
exports.id = 222;
exports.ids = [222];
exports.modules = {

/***/ 5830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Member),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "lodash/find"
var find_ = __webpack_require__(6918);
var find_default = /*#__PURE__*/__webpack_require__.n(find_);
;// CONCATENATED MODULE: external "lodash/reject"
const reject_namespaceObject = require("lodash/reject");
var reject_default = /*#__PURE__*/__webpack_require__.n(reject_namespaceObject);
// EXTERNAL MODULE: external "lodash/map"
var map_ = __webpack_require__(3707);
var map_default = /*#__PURE__*/__webpack_require__.n(map_);
// EXTERNAL MODULE: external "lodash/chunk"
var chunk_ = __webpack_require__(221);
var chunk_default = /*#__PURE__*/__webpack_require__.n(chunk_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./components/header.jsx
var header = __webpack_require__(1619);
// EXTERNAL MODULE: ./components/footer.jsx
var footer = __webpack_require__(7180);
// EXTERNAL MODULE: ./components/breadcrumbs.jsx
var breadcrumbs = __webpack_require__(307);
// EXTERNAL MODULE: ./data/db.json
var db = __webpack_require__(5875);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./pages/[member]/index.js













const CHUNK_SIZE = 3;
function Member({
  eras,
  memberCode,
  memberName
}) {
  const chunkedContents = chunk_default()(eras !== null && eras !== void 0 ? eras : [], CHUNK_SIZE);

  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Row, {
      justify: "center",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Col, {
        span: 22,
        children: [/*#__PURE__*/jsx_runtime_.jsx(header/* default */.Z, {}), /*#__PURE__*/jsx_runtime_.jsx(breadcrumbs/* default */.Z, {
          crumbs: [[memberName]]
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Divider, {
          orientation: "center",
          style: {
            fontWeight: '600',
            fontSize: '1.2em'
          },
          children: "Select Era"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Row, {
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
            children: chunkedContents.map((chunk, idx) => /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Row, {
              gutter: {
                xs: 16,
                md: 24
              },
              justify: "space-evenly",
              align: "bottom",
              children: chunk.map(era => /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
                span: 8,
                style: {
                  marginBottom: '1em'
                },
                children: /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
                  href: `${memberCode}/${era.code}`,
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                    style: {
                      color: 'inherit'
                    },
                    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                      children: era.name
                    }), /*#__PURE__*/jsx_runtime_.jsx("img", {
                      style: {
                        maxHeight: '50vh',
                        width: '100%',
                        minWidth: 0,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                      },
                      src: era.img,
                      alt: era.name
                    })]
                  })
                })
              }, era.code))
            }, idx))
          })
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(footer/* default */.Z, {})]
    })
  });
}
async function getStaticPaths() {
  map_default()(db.members, m => ({
    params: {
      member: m.code
    }
  }));

  return {
    paths: map_default()(db.members, m => ({
      params: {
        member: m.code
      }
    })),
    fallback: false
  };
}
async function getStaticProps({
  params
}) {
  var _find2;

  const code = params === null || params === void 0 ? void 0 : params.member;
  const eras = code === 'jgr' ? reject_default()(db === null || db === void 0 ? void 0 : db.eras, {
    code: 'td'
  }) : db === null || db === void 0 ? void 0 : db.eras;
  const memberName = (_find2 = find_default()(db === null || db === void 0 ? void 0 : db.members, {
    code
  })) === null || _find2 === void 0 ? void 0 : _find2.name;
  return {
    props: {
      eras,
      memberName,
      memberCode: code
    }
  };
}

/***/ }),

/***/ 5725:
/***/ ((module) => {

module.exports = require("antd");

/***/ }),

/***/ 9065:
/***/ ((module) => {

module.exports = require("lodash/castArray");

/***/ }),

/***/ 221:
/***/ ((module) => {

module.exports = require("lodash/chunk");

/***/ }),

/***/ 6918:
/***/ ((module) => {

module.exports = require("lodash/find");

/***/ }),

/***/ 3707:
/***/ ((module) => {

module.exports = require("lodash/map");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,875,237,307], () => (__webpack_exec__(5830)));
module.exports = __webpack_exports__;

})();