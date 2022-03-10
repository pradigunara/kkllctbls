"use strict";
(() => {
var exports = {};
exports.id = 222;
exports.ids = [222];
exports.modules = {

/***/ 4903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Member),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(221);
/* harmony import */ var components_footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7524);
/* harmony import */ var components_breadcrumbs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2361);
/* harmony import */ var data_db_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5875);








const CHUNK_SIZE = 3;
function Member({ eras , memberCode , memberName  }) {
    const chunkedContents = lodash__WEBPACK_IMPORTED_MODULE_1___default().chunk(eras ?? [], CHUNK_SIZE);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Row, {
            justify: "center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 22,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_header__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_breadcrumbs__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            crumbs: [
                                [
                                    memberName
                                ]
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                            orientation: "center",
                            style: {
                                fontWeight: '600',
                                fontSize: '1.2em'
                            },
                            children: "Select Era"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Row, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                                children: chunkedContents.map((chunk, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Row, {
                                        gutter: {
                                            xs: 16,
                                            md: 24
                                        },
                                        justify: "space-evenly",
                                        align: "bottom",
                                        children: chunk.map((era)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                                                span: 8,
                                                style: {
                                                    marginBottom: '1em'
                                                },
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                                                    href: `${memberCode}/${era.code}`,
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                        style: {
                                                            color: 'inherit'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                children: era.name
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                style: {
                                                                    maxHeight: '50vh',
                                                                    width: '100%',
                                                                    minWidth: 0,
                                                                    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                                                                },
                                                                src: era.img,
                                                                alt: era.name
                                                            })
                                                        ]
                                                    })
                                                })
                                            }, era.code)
                                        )
                                    }, idx)
                                )
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_footer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
            ]
        })
    }));
};
async function getStaticPaths() {
    lodash__WEBPACK_IMPORTED_MODULE_1___default().map(data_db_json__WEBPACK_IMPORTED_MODULE_7__.members, (m)=>({
            params: {
                member: m.code
            }
        })
    );
    return {
        paths: lodash__WEBPACK_IMPORTED_MODULE_1___default().map(data_db_json__WEBPACK_IMPORTED_MODULE_7__.members, (m)=>({
                params: {
                    member: m.code
                }
            })
        ),
        fallback: false
    };
}
async function getStaticProps({ params  }) {
    var ref;
    const code = params === null || params === void 0 ? void 0 : params.member;
    const eras = code === 'jgr' ? lodash__WEBPACK_IMPORTED_MODULE_1___default().reject(data_db_json__WEBPACK_IMPORTED_MODULE_7__ === null || data_db_json__WEBPACK_IMPORTED_MODULE_7__ === void 0 ? void 0 : data_db_json__WEBPACK_IMPORTED_MODULE_7__.eras, {
        code: 'td'
    }) : data_db_json__WEBPACK_IMPORTED_MODULE_7__ === null || data_db_json__WEBPACK_IMPORTED_MODULE_7__ === void 0 ? void 0 : data_db_json__WEBPACK_IMPORTED_MODULE_7__.eras;
    const memberName = (ref = lodash__WEBPACK_IMPORTED_MODULE_1___default().find(data_db_json__WEBPACK_IMPORTED_MODULE_7__ === null || data_db_json__WEBPACK_IMPORTED_MODULE_7__ === void 0 ? void 0 : data_db_json__WEBPACK_IMPORTED_MODULE_7__.members, {
        code
    })) === null || ref === void 0 ? void 0 : ref.name;
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

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

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
var __webpack_exports__ = __webpack_require__.X(0, [730,664,875,283,361], () => (__webpack_exec__(4903)));
module.exports = __webpack_exports__;

})();