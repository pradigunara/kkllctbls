"use strict";
(() => {
var exports = {};
exports.id = 851;
exports.ids = [851];
exports.modules = {

/***/ 2634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Era),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "lodash/find"
var find_ = __webpack_require__(6918);
var find_default = /*#__PURE__*/__webpack_require__.n(find_);
// EXTERNAL MODULE: external "lodash/chunk"
var chunk_ = __webpack_require__(221);
var chunk_default = /*#__PURE__*/__webpack_require__.n(chunk_);
;// CONCATENATED MODULE: external "lodash/filter"
const filter_namespaceObject = require("lodash/filter");
var filter_default = /*#__PURE__*/__webpack_require__.n(filter_namespaceObject);
// EXTERNAL MODULE: external "lodash/map"
var map_ = __webpack_require__(3707);
var map_default = /*#__PURE__*/__webpack_require__.n(map_);
// EXTERNAL MODULE: external "lodash/noop"
var noop_ = __webpack_require__(7553);
var noop_default = /*#__PURE__*/__webpack_require__.n(noop_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "use-double-tap"
var external_use_double_tap_ = __webpack_require__(2833);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
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
;// CONCATENATED MODULE: ./pages/[member]/[era].js






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const CROSSED_STORAGE_KEY = 'crossedIds';
const WISHLIST_STORAGE_KEY = 'wishlists';
const storageMock = {
  getItem: (noop_default()),
  setItem: (noop_default())
};
const localStorage =  true ? storageMock : 0;
const sessionStorage =  true ? storageMock : 0;

function storeIDs(ids) {
  localStorage.setItem(CROSSED_STORAGE_KEY, JSON.stringify(ids));
}

function getIDs() {
  return new Set(JSON.parse(localStorage.getItem(CROSSED_STORAGE_KEY) || '[]'));
}

function storeWishlist(wishlist) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

function getWishlist() {
  const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
  return new Map(wishlist.map(({
    id,
    url,
    rounded
  }) => [id, {
    url,
    rounded
  }]));
}

function Era({
  member,
  era,
  sortedSections
}) {
  const {
    0: chunkSize,
    1: setChunkSize
  } = (0,external_react_.useState)(era === null || era === void 0 ? void 0 : era.photosPerRow);
  const {
    0: wishlistMode,
    1: setWishlistMode
  } = (0,external_react_.useState)(false);
  const {
    0: showMark,
    1: setShowMark
  } = (0,external_react_.useState)(true);
  const {
    0: showName,
    1: setShowName
  } = (0,external_react_.useState)(true);
  const {
    0: crossed,
    1: setCrossed
  } = (0,external_react_.useState)(new Set());
  const {
    0: wishlists,
    1: setWishlists
  } = (0,external_react_.useState)(getWishlist()); // fix hydration error (no localstorage on server)

  (0,external_react_.useEffect)(() => setCrossed(getIDs()), []);

  const handleChunkChange = ({
    target
  }) => setChunkSize(target === null || target === void 0 ? void 0 : target.value);

  const handleShowMarkChange = ({
    target
  }) => setShowMark(target === null || target === void 0 ? void 0 : target.value);

  const handleShowNameChange = ({
    target
  }) => setShowName(target === null || target === void 0 ? void 0 : target.value);

  const handleWishlistMode = () => {
    !sessionStorage.getItem('wlguide') && !wishlistMode && external_antd_.Modal.info({
      title: 'Wishlist Mode',
      content: /*#__PURE__*/jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
          children: ["In this mode, double-tapping the item will add that item to your wishlist.", /*#__PURE__*/jsx_runtime_.jsx("br", {}), "You can access your wishlist from the bottom of homepage (below member selection)"]
        })
      }),

      onOk() {
        sessionStorage.setItem('wlguide', '1');
      }

    });
    setWishlistMode(wl => !wl);
  };

  const handleToggleWishlist = (id, url, rounded) => {
    wishlists.has(id) ? wishlists.delete(id) : wishlists.set(id, {
      url,
      rounded
    });

    const updatedWishlists = map_default()([...wishlists.entries()], ([k, v]) => _objectSpread({
      id: k
    }, v));

    storeWishlist(updatedWishlists);
    return setWishlists(new Map([...wishlists.entries()]));
  };

  const handleDoubleTap = (imgID, imgUrl, rounded) => {
    if (wishlistMode) {
      return handleToggleWishlist(imgID, imgUrl, rounded);
    }

    crossed.has(imgID) ? crossed.delete(imgID) : crossed.add(imgID);
    const updatedIDs = [...crossed];
    storeIDs(updatedIDs);
    return setCrossed(new Set(updatedIDs));
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Container, {
    span: 22,
    children: [/*#__PURE__*/jsx_runtime_.jsx(header/* default */.Z, {
      slotRight: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
        type: "primary",
        shape: "circle",
        icon: wishlistMode ? /*#__PURE__*/jsx_runtime_.jsx(icons_.StarFilled, {}) : /*#__PURE__*/jsx_runtime_.jsx(icons_.StarOutlined, {}),
        size: "large",
        onClick: handleWishlistMode
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(breadcrumbs/* default */.Z, {
      crumbs: [[member.name, `/${member.code}`], [era.name]]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h3", {
      children: ["Double tap to ", wishlistMode ? 'add wishlist' : 'mark photos', "!"]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Row, {
      justify: "end",
      children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
        children: "Photos per row :"
      }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
        offset: 1,
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Radio.Group, {
          onChange: handleChunkChange,
          value: chunkSize,
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Radio, {
            value: 3,
            children: "3"
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Radio, {
            value: 4,
            children: "4"
          })]
        })
      })]
    }), !wishlistMode && /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Row, {
        justify: "end",
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
          children: "Show marked :"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
          offset: 1,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Radio.Group, {
            onChange: handleShowMarkChange,
            value: showMark,
            children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Radio, {
              value: true,
              children: "Y"
            }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Radio, {
              value: false,
              children: "N"
            })]
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Row, {
        justify: "end",
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
          children: "Show name :"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
          offset: 1,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Radio.Group, {
            onChange: handleShowNameChange,
            value: showName,
            children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Radio, {
              value: true,
              children: "Y"
            }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Radio, {
              value: false,
              children: "N"
            })]
          })
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(Container, {
      span: 24,
      children: sortedSections.map(({
        name,
        content
      }) => {
        const filteredContent = filter_default()(content !== null && content !== void 0 ? content : [], c => wishlistMode || showMark ? true : !crossed.has(c.id));

        const contentChunks = chunk_default()(filteredContent, chunkSize);

        return /*#__PURE__*/jsx_runtime_.jsx(Section, {
          name: name,
          children: contentChunks.map((cardChunk, idx) => /*#__PURE__*/jsx_runtime_.jsx(CardRow, {
            chunk: chunkSize,
            children: cardChunk.map(card => /*#__PURE__*/jsx_runtime_.jsx(Card, {
              card: card,
              isCrossed: crossed.has(card.id),
              isWishlist: wishlists.has(card.id),
              onDoubleTap: handleDoubleTap,
              chunk: chunkSize,
              showName: !wishlistMode && showName,
              wishlistMode: wishlistMode
            }, card.id))
          }, `${name}-${idx}`))
        }, name);
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(footer/* default */.Z, {})]
  });
}

function Container({
  children,
  span
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Row, {
    justify: "center",
    children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Col, {
      span: span,
      children: children
    })
  });
}

function Section({
  name,
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Container, {
    span: 24,
    children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Divider, {
      orientation: "left",
      style: {
        fontWeight: '600',
        fontSize: '1.2em'
      },
      children: name
    }), children]
  });
}

function CardRow({
  children,
  chunk
}) {
  const base = chunk === 3 ? 8 : chunk === 4 ? 4 : 8;
  return /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Row, {
    gutter: {
      xs: base * 2,
      md: base * 3
    },
    justify: "space-evenly",
    align: "bottom",
    children: children
  });
}

function Card({
  card,
  isCrossed,
  isWishlist = false,
  onDoubleTap,
  chunk = 3,
  showName,
  wishlistMode
}) {
  const bindDoubleTap = (0,external_use_double_tap_.useDoubleTap)(e => {
    var _e$target, _e$target2, _e$target3;

    return onDoubleTap(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.id, e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.getAttribute('data-url'), (e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.getAttribute('data-rounded')) === 'true');
  }, 800);
  const isOpaque = wishlistMode ? !isWishlist : isCrossed;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Col, {
    span: 24 / chunk,
    style: {
      marginBottom: '1em'
    },
    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
      style: {
        fontSize: `${3 / chunk}em`,
        textDecoration: isCrossed && 'line-through',
        display: !showName && 'none'
      },
      children: card.name
    }), /*#__PURE__*/jsx_runtime_.jsx("img", _objectSpread({
      id: card.id,
      style: {
        maxHeight: '50vh',
        width: '100%',
        minWidth: 0,
        cursor: 'pointer',
        borderRadius: card.rounded && `${2.4 / chunk}em`,
        opacity: isOpaque && '0.3',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
      },
      src: card.img,
      alt: card.name,
      "data-url": card.img,
      "data-rounded": card.rounded
    }, bindDoubleTap))]
  }, card.id);
}

async function getStaticPaths() {
  const paths = [];

  for (const member of db.members) {
    for (const era of db.eras) {
      if (member.code === 'jgr' && era.code === 'td') {
        continue;
      }

      paths.push({
        params: {
          member: member.code,
          era: era.code
        }
      });
    }
  }

  return {
    paths,
    fallback: false
  };
}
async function getStaticProps({
  params
}) {
  var _db$cards$params$memb, _db$cards, _db$cards$params$memb2, _db$sections$params$e, _db$sections;

  const foundMember = find_default()(db.members, {
    code: params === null || params === void 0 ? void 0 : params.member
  });

  const foundEra = find_default()(db.eras, {
    code: params === null || params === void 0 ? void 0 : params.era
  });

  const eraSections = (_db$cards$params$memb = (_db$cards = db.cards) === null || _db$cards === void 0 ? void 0 : (_db$cards$params$memb2 = _db$cards[params === null || params === void 0 ? void 0 : params.member]) === null || _db$cards$params$memb2 === void 0 ? void 0 : _db$cards$params$memb2[params === null || params === void 0 ? void 0 : params.era]) !== null && _db$cards$params$memb !== void 0 ? _db$cards$params$memb : [];
  const sectionList = (_db$sections$params$e = (_db$sections = db.sections) === null || _db$sections === void 0 ? void 0 : _db$sections[params === null || params === void 0 ? void 0 : params.era]) !== null && _db$sections$params$e !== void 0 ? _db$sections$params$e : [];
  const sortedSections = sectionList.map(section => ({
    name: section.name,
    content: eraSections[section.code]
  }));
  return {
    props: {
      member: foundMember,
      era: foundEra,
      sortedSections
    }
  };
}

/***/ }),

/***/ 7066:
/***/ ((module) => {

module.exports = require("@ant-design/icons");

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

/***/ 7553:
/***/ ((module) => {

module.exports = require("lodash/noop");

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

/***/ }),

/***/ 2833:
/***/ ((module) => {

module.exports = require("use-double-tap");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,875,237,307], () => (__webpack_exec__(2634)));
module.exports = __webpack_exports__;

})();