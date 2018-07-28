webpackJsonp([0],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderer = exports.loopControl = exports.root = exports.HEIGHT = exports.WIDTH = exports.PIXI = undefined;

var _pixi = __webpack_require__(22);

var PIXI = _interopRequireWildcard(_pixi);

var _pixiSmoothie = __webpack_require__(91);

var Smoothie = _interopRequireWildcard(_pixiSmoothie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// init viewport
// init.js 
var _HEIGHT = 240; //document.documentElement.clientHeight;
var _WIDTH = 320; //document.documentElement.clientWidth;

//Create the renderer
var renderer = PIXI.autoDetectRenderer(_WIDTH, _HEIGHT);

// for export
var HEIGHT = renderer.height;
var WIDTH = renderer.width;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

// create main container
var root = new PIXI.Container();
var loop = new Smoothie.default({
    engine: PIXI,
    renderer: renderer,
    root: root,
    fps: 24,
    update: gameLoop
});

// array to contain elements to update each frame.
var gameLoopArray = [];

// update elements every tick (every frame of FPS).
function gameLoop() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = gameLoopArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            elem.update();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
};

// control of game loop.
var loopControl = {
    setFPS: function setFPS(fps) {
        loop.fps = fps;
    },
    start: function start() {
        loop.start();
    },
    pause: function pause() {
        loop.pause();
    },
    resume: function resume() {
        loop.resume();
    }
};

exports.PIXI = PIXI;
exports.WIDTH = WIDTH;
exports.HEIGHT = HEIGHT;
exports.root = root;
exports.loopControl = loopControl;
exports.renderer = renderer;

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.show = exports.hide = exports.update = exports.draw = undefined;

var _init = __webpack_require__(11);

var _BackgroundRectangle = __webpack_require__(198);

var _FrontRectangle = __webpack_require__(199);

var _Text = __webpack_require__(200);

var _Percent = __webpack_require__(201);

var container = new _init.PIXI.Container(); // loader.js

var backRect = new _BackgroundRectangle.BackgroundRectangle(0x66CCFF, 100, 20);
var frontRect = new _FrontRectangle.FrontRectangle(0xFFFF00, 1, 20);
var text = new _Text.Text('Loading ...', "Arial", 12, "white");
var percent = new _Percent.Percent("0 %", "Arial", 12, "white");

/** Create the loader scene */
function draw() {
    // add to container
    container.addChild(backRect);
    container.addChild(frontRect);
    container.addChild(text);
    container.addChild(percent);

    // set position of elements
    text.y = backRect.height + 5; // 5px after background height end
    percent.x = backRect.width + 5; // 5px after background width end
    percent.y = 5; // just 5px 

    // center the container
    container.x = (_init.WIDTH - container.width) / 2;
    container.y = (_init.HEIGHT - container.height) / 2;

    // add scene to root container
    _init.root.addChild(container);
};

/**
 * Update data in loader scene.
 * @param { String } str url of file which is loading
 * @param { Number } progress how many loaded
 */
function update(str, progress) {
    text.text = str;
    percent.text = progress.toFixed() + " %";
    frontRect.width = progress.toFixed();
};

/** Hide scene. */
function hide() {
    container.visible = false;
};
/** Show scene again. */
function show() {
    container.visible = true;
};

/** destroy container with loader scene*/
function clear() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            elem.destroy();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    _init.root.removeChild(container);
};

exports.draw = draw;
exports.update = update;
exports.hide = hide;
exports.show = show;
exports.clear = clear;

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundRectangle = exports.BackgroundRectangle = function (_PIXI$Graphics) {
    _inherits(BackgroundRectangle, _PIXI$Graphics);

    function BackgroundRectangle(color, width, height) {
        _classCallCheck(this, BackgroundRectangle);

        var _this = _possibleConstructorReturn(this, (BackgroundRectangle.__proto__ || Object.getPrototypeOf(BackgroundRectangle)).call(this));

        _this.beginFill(color);
        _this.drawRect(0, 0, width, height);
        _this.endFill();
        return _this;
    }

    return BackgroundRectangle;
}(PIXI.Graphics);

;

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrontRectangle = exports.FrontRectangle = function (_PIXI$Graphics) {
    _inherits(FrontRectangle, _PIXI$Graphics);

    function FrontRectangle(color, width, height) {
        _classCallCheck(this, FrontRectangle);

        var _this = _possibleConstructorReturn(this, (FrontRectangle.__proto__ || Object.getPrototypeOf(FrontRectangle)).call(this));

        _this.beginFill(color);
        _this.drawRect(0, 0, width, height);
        _this.endFill();
        return _this;
    }

    _createClass(FrontRectangle, [{
        key: "update",
        value: function update(progress) {
            this.width = progress.toFixed();
        }
    }]);

    return FrontRectangle;
}(PIXI.Graphics);

;

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_PIXI$Text) {
    _inherits(Text, _PIXI$Text);

    function Text(text, fontFamily, fontSize, fontFill) {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, text, {
            fontFamily: fontFamily,
            fontSize: fontSize,
            fill: fontFill
        }));
    }

    _createClass(Text, [{
        key: "update",
        value: function update(text) {
            this.text = text;
        }
    }]);

    return Text;
}(PIXI.Text);

;

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Percent = exports.Percent = function (_PIXI$Text) {
    _inherits(Percent, _PIXI$Text);

    function Percent(text, fontFamily, fontSize, fontFill) {
        _classCallCheck(this, Percent);

        return _possibleConstructorReturn(this, (Percent.__proto__ || Object.getPrototypeOf(Percent)).call(this, text, {
            fontFamily: fontFamily,
            fontSize: fontSize,
            fill: fontFill
        }));
    }

    _createClass(Percent, [{
        key: "update",
        value: function update(progress) {
            this.text = progress.toFixed() + " %";
        }
    }]);

    return Percent;
}(PIXI.Text);

;

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menu = undefined;

var _main = __webpack_require__(203);

var main = _interopRequireWildcard(_main);

var _credits = __webpack_require__(206);

var credits = _interopRequireWildcard(_credits);

var _create = __webpack_require__(207);

var create = _interopRequireWildcard(_create);

var _join = __webpack_require__(208);

var join = _interopRequireWildcard(_join);

var _wait = __webpack_require__(210);

var wait = _interopRequireWildcard(_wait);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var menu = exports.menu = {
    main: main,
    join: join,
    create: create,
    credits: credits,
    wait: wait
};

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.show = exports.hide = exports.move = exports.draw = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // main.js


var _init = __webpack_require__(11);

var _Background = __webpack_require__(204);

var _MenuElement = __webpack_require__(205);

var _isDraw = false;
var container = new _init.PIXI.Container();

/**
 * Create the menu scene
 * @param { Array<String> } elements menu elements 
 * @param { Number } active active element
 */
function draw(elements) {
    var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (_isDraw) return update(active);

    _isDraw = true;

    var background = new _Background.Background(_init.WIDTH, _init.HEIGHT);
    container.addChild(background);

    for (var i = 0; i < elements.length; ++i) {
        if (i == active) {
            var element = new _MenuElement.MenuElement(elements[i]);
            element.active();
            element.position.x = 20;
            element.position.y = 120 + 30 * i;
            container.addChild(element);
        } else {
            var _element = new _MenuElement.MenuElement(elements[i]);
            _element.position.x = 20;
            _element.position.y = 120 + 30 * i;
            container.addChild(_element);
        };
    };

    // add scene to root container
    _init.root.addChild(container);
};

/**
 * Move by elements menu.
 * @param { Number } active menu element
 */
function move(active) {
    // because first element of CONTAINER is Background image
    active++;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var index = _ref2[0];
            var elem = _ref2[1];

            if (index == active) {
                if (elem.active) elem.active();
            } else {
                if (elem.inActive) elem.inActive();
            };
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
};

/** Hide scene. */
function hide() {
    container.visible = false;
};

/** Show scene again. */
function show() {
    container.visible = true;
};

/** destroy container with menu main scene*/
function clear() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = container.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elem = _step2.value;

            elem.destroy();
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;

    _init.root.removeChild(container);
};

exports.draw = draw;
exports.move = move;
exports.hide = hide;
exports.show = show;
exports.clear = clear;

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Background = exports.Background = function (_PIXI$Sprite) {
    _inherits(Background, _PIXI$Sprite);

    function Background(width, height) {
        _classCallCheck(this, Background);

        var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));

        _this.texture = PIXI.loader.resources["menu-img"].texture;
        _this.width = width;
        _this.height = height;
        return _this;
    }

    return Background;
}(PIXI.Sprite);

;

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuElement = exports.MenuElement = function (_PIXI$Container) {
    _inherits(MenuElement, _PIXI$Container);

    function MenuElement(title) {
        _classCallCheck(this, MenuElement);

        var _this = _possibleConstructorReturn(this, (MenuElement.__proto__ || Object.getPrototypeOf(MenuElement)).call(this));

        _this.sprite = new PIXI.Sprite(PIXI.loader.resources["menu-elem"].texture);
        _this.sprite.width = 150;
        _this.sprite.height = 25;

        _this.text = new PIXI.Text(title, {
            fontSize: 12,
            fontStyle: "italic",
            fontVariant: "small-caps",
            fontWeight: "bold",
            fill: "black"
        });

        _this.addChild(_this.sprite);
        _this.addChild(_this.text);

        _this.text.position.x = (_this.sprite.width - _this.text.width) / 2;
        _this.text.position.y = (_this.sprite.height - _this.text.height) / 3;
        return _this;
    }

    _createClass(MenuElement, [{
        key: "active",

        /**Set text to active status */
        value: function active() {
            this.text.style.fill = "yellow";
        }
    }, {
        key: "inActive",

        /**Set text to inactive status */
        value: function inActive() {
            this.text.style.fill = "black";
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.sprite.destroy();
            this.text.destroy();
            this.parent.removeChild(this);
        }
    }]);

    return MenuElement;
}(PIXI.Container);

;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// menu credits.js

// cache
var container = void 0,
    interval = void 0,
    timer = void 0,
    defaultHeight = void 0;
var cacheArray = [];

/**
 * Create the credits scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { String[] } textArr array of strings with text
 */
function draw(PIXI, root, wHeight, wWidth, textArr) {
    // cache
    defaultHeight = wHeight;
    // container for progress bar scene
    container = new PIXI.Container();

    // add background to scene
    var background = new PIXI.Sprite(PIXI.loader.resources["credits-img"].texture);
    background.width = wWidth;
    background.height = wHeight;
    container.addChild(background);

    // create text
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = textArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var text = _step.value;

            var elem = new PIXI.Text(text, {
                fontFamily: "Arial",
                fontSize: 12,
                fill: "white",
                fontVariant: "small-caps",
                fontWeight: "bold"
            });
            // set position
            elem.y = wHeight;
            elem.x = (wWidth - elem.width) / 2;
            // add to cache
            cacheArray.push(elem);
            // add to container
            container.addChild(elem);

            wHeight += 20;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    _intervalStart();

    // add to root container. On next tick it will be draw
    root.addChild(container);
};

// destroy container with loader scene
function pause() {
    clearInterval(interval);
    container.visible = false;

    // set default value
    var y = defaultHeight;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = cacheArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elem = _step2.value;

            elem.y = y;
            y += 20;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;
};

function resume() {
    container.visible = true;
    _intervalStart();
};

function clear(params) {
    // remove menu elements
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = container.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var elem = _step3.value;

            if (elem.destroy) elem.destroy();
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

exports.draw = draw;
exports.resume = resume;
exports.pause = pause;
exports.clear = clear;


function _intervalStart() {
    interval = setInterval(function () {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = cacheArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var elem = _step4.value;

                elem.y -= 1;
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        ;

        ++timer;
    }, 40);
};

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// create.js

// cache
var container = void 0,
    cacheTextelem = [];

/**
 * Create the server scene and place it to root container.
 * @param { Array<String> } elements elements menu
 * @param { Number } active active element
 */
function draw(PIXI, root, wHeight, wWidth, elements, active) {
    // container for progress bar scene
    container = new PIXI.Container();

    // add background to scene
    var background = new PIXI.Sprite(PIXI.loader.resources["credits-img"].texture);
    background.width = wWidth;
    background.height = wHeight;
    container.addChild(background);

    // iterate income data and create element on each
    for (var i = 0, x = 0; i < elements.length; ++i, ++x) {
        if (i == active) _createMenuElement(elements[i], true, 20, 50 + 30 * x);else _createMenuElement(elements[i], false, 20, 50 + 30 * x);
    };

    // add to global
    root.addChild(container);
};

/**
 * Update data in server scene.
 * @param { Number } active menu element
 */
function update(active) {
    for (var index = 0; index < cacheTextelem.length; index++) {
        if (index == active) {
            cacheTextelem[index].style.fill = "yellow";
        } else {
            cacheTextelem[index].style.fill = "black";
        };
    };
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

function clear() {
    // remove menu elements
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cacheTextelem[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            if (elem.destroy) elem.destroy();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = container.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _elem = _step2.value;

            if (_elem.destroy) _elem.destroy();
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

exports.draw = draw;
exports.update = update;
exports.pause = pause;
exports.resume = resume;
exports.clear = clear;


function _createMenuElement(title, active) {
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var sprite = new PIXI.Sprite(PIXI.loader.resources["menu-elem"].texture);
    var text = new PIXI.Text(title, {
        fontSize: 12,
        fontStyle: "italic",
        fontVariant: "small-caps",
        fontWeight: "bold"
    });

    var cont = new PIXI.Container();

    if (active) text.style.fill = "yellow";else text.style.fill = "black";

    sprite.width = 150;
    sprite.height = 25;
    text.x = (sprite.width - text.width) / 2;
    text.y = (sprite.height - text.height) / 3;
    cont.x = x;
    cont.y = y;

    cont.addChild(sprite);
    cont.addChild(text);

    // to comfort change in future
    cacheTextelem.push(text);

    container.addChild(cont);
};

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.hide = exports.show = exports.move = exports.draw = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // join.js 


var _init = __webpack_require__(11);

var _Text = __webpack_require__(209);

var container = new _init.PIXI.Container();

/**
 * Create the server scene.
 * @param { Array<{ name: string, password: string, maxUnits: number }> } elements list of waitings users.
 * @param { Number } active active element
 */
function draw(elements, active) {
    // create elements of waitings users.
    _createList(elements, active);

    // if re-draw
    container.visible = true;

    // add to global.
    _init.root.addChild(container);
};

/**
 * Update data in server scene.
 * @param { Number } active active element.
 */
function move(active) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var index = _ref2[0];
            var text = _ref2[1];

            if (index == active) text.active();else text.inActive();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
};

/** Hide scene. */
function hide() {
    // have to use revers iteration, because removing element call auto clean container and indexes moving
    for (var index = container.children.length - 1; index >= 0; --index) {
        container.children[index].destroy();
    };
    container.visible = false;
};

/** Show scene again. */
function show(list, active) {
    // create texture
    _createList(list, active);

    // if it's re-draw
    container.visible = true;
};

/** destroy container with menu main scene. */
function clear() {
    // remove elements.
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = container.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elem = _step2.value;

            elem.destroy();
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;

    _init.root.removeChild(container);
};

exports.draw = draw;
exports.move = move;
exports.show = show;
exports.hide = hide;
exports.clear = clear;

/**
 * @param { Array<{ name: string, password: string, maxUnits: number }> } elements list of waitings users.
 * @param { Number } active active element.
 */

function _createList(elements, active) {
    // create list with waiting battle users.
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = elements.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _ref3 = _step3.value;

            var _ref4 = _slicedToArray(_ref3, 2);

            var index = _ref4[0];
            var elem = _ref4[1];

            var text = new _Text.Text("name - " + elem.name + ", password - " + (elem.password ? "yes" : "no") + ", max - " + elem.maxUnits);
            text.position.x = 30;
            text.position.y = 50 + 30 * index;

            if (index == active) text.active();

            container.addChild(text);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    ;

    // if no user at all.
    if (elements.length == 0) {
        var text = new _init.PIXI.Text("Sorry, no user wait a battle.\nCreate your server!", { fontFamily: "Arial", fontSize: 14, fill: "red", align: "center" });
        text.position.x = (_init.WIDTH - text.width) / 2;
        text.position.y = (_init.HEIGHT - text.height) / 2;

        container.addChild(text);
    };
};

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_PIXI$Text) {
    _inherits(Text, _PIXI$Text);

    function Text(title) {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, title, {
            fontFamily: "Arial",
            fontSize: 14,
            fill: 0xffffff
        }));
    }

    _createClass(Text, [{
        key: "active",
        value: function active() {
            this.style.fill = 0xffff00;
        }
    }, {
        key: "inActive",
        value: function inActive() {
            this.style.fill = 0xffffff;
        }
    }]);

    return Text;
}(PIXI.Text);

;

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// wait.js

// cache
var container = void 0;

/**
 * Create the wait scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 */
function draw(PIXI, root, wHeight, wWidth) {
    // container for menu scene
    container = new PIXI.Container();

    var backgroundImage = new PIXI.Sprite(PIXI.loader.resources["credits-img"].texture);
    backgroundImage.width = wWidth;
    backgroundImage.height = wHeight;
    container.addChild(backgroundImage);

    var rect = new PIXI.Graphics();
    rect.beginFill(0xFF0000);
    rect.drawRect(0, 0, 100, 20);
    rect.endFill();
    rect.x = (wWidth - rect.width) / 2;
    rect.y = (wHeight - rect.height) / 2;

    var text = new PIXI.Text('Please, wait!', { fontFamily: "Arial", fontSize: 16, fill: "yellow" });
    text.x = (wWidth - rect.width) / 2;
    text.y = (wHeight - rect.height) / 2;

    container.addChild(rect);
    container.addChild(text);

    // add scene to root container
    root.addChild(container);
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

function clear() {
    // remove menu elements
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            elem.destroy();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

exports.draw = draw;
exports.pause = pause;
exports.resume = resume;
exports.clear = clear;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// settings main.js

// cache
var container = void 0,
    menuElementsArray = [];

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } windowHeight heigh of game canvas
 * @param { Number } windowWidth width of game canvas
 * @param { Array<String> } menu elements menu
 * @param { Number } active active element
 */
function draw(PIXI, root, windowHeight, windowWidth, menu, active) {
    // container for scene
    container = new PIXI.Container();
    container.width = 55;
    container.x = 260;
    container.y = 175;

    var y = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = menu.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var index = _ref2[0];
            var elem = _ref2[1];

            var text = new PIXI.Text(elem, {
                fontSize: 8,
                fontVariant: "small-caps",
                fontWeight: "bold",
                fill: "white"
            });
            text.y = 10 * y;
            text.x = 5;
            if (index == active) text.style.fill = 0xffff00;
            ++y;
            menuElementsArray.push(text);
            container.addChild(text);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data in menu scene.
 * @param { Number } active menu element
 */
function update(active) {
    for (var index = 0; index < menuElementsArray.length; index++) {
        if (index == active) {
            menuElementsArray[index].style.fill = "yellow";
        } else {
            menuElementsArray[index].style.fill = "white";
        };
    };
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

function clear() {
    // remove menu elements
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = menuElementsArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elem = _step2.value;

            elem.destroy();
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = container.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _elem = _step3.value;

            _elem.destroy();
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

exports.draw = draw;
exports.clear = clear;
exports.pause = pause;
exports.resume = resume;
exports.update = update;

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// settings background.js

// cache
var container = void 0;

/**
 * Create the settings background and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } windowHeight heigh of game canvas
 * @param { Number } windowWidth width of game canvas
 */
function draw(PIXI, root, windowHeight, windowWidth) {
    // container for scene
    container = new PIXI.Container();

    // background image
    var backgroundImage = new PIXI.Sprite(PIXI.loader.resources["settings-background"].texture);
    backgroundImage.width = windowWidth;
    backgroundImage.height = windowHeight;
    container.addChild(backgroundImage);
    // right menu
    var menu = new PIXI.Sprite(PIXI.loader.resources["settings-background-element"].texture);
    menu.width = 65;
    menu.height = 240;
    menu.x = 255; // move to right
    container.addChild(menu);

    // add scene to root container
    root.addChild(container);
};

function clear() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            elem.destroy();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
    container.parent.removeChild(container);
};

exports.draw = draw;
exports.clear = clear;

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// settings your.js

// cache
var container = void 0;

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { Array<String> } list list of melee ships
 */
function draw(PIXI, root, wHeight, wWidth, list) {
    // container for scene
    container = new PIXI.Container();

    for (var index = 0, x = 3; index < list.length; index++, x += 2) {
        // container for element
        var subContainer = _createElement(list[index]);

        // set position
        if (index == 6) x = 3; // reset
        if (index < 6) {
            subContainer.position.y = 20;
            subContainer.position.x = 40 * index + x;
        } else {
            subContainer.position.x = 40 * (index - 6) + x;
            subContainer.position.y = 62;
        };

        // add to root
        container.addChild(subContainer);
    };

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data in menu scene.
 * @param { Number } active menu element
 */
function update(active) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var index = _ref2[0];
            var subContainer = _ref2[1];

            if (index == active) {
                subContainer.children[0].active();
            } else {
                subContainer.children[0].inactive();
            };
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
};

/**
 * @param { Number } active number of element to change
 * @param { Object } ship change to this ship
 */
function changeShip(active, title) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = container.children[active].children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var sprite = _step2.value;

            sprite.changeShip(title);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;
};

function clear() {
    // remove menu elements
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = container.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var subContainer = _step3.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = subContainer.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var elem = _step4.value;

                    if (elem.destroy) elem.destroy();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            ;
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

exports.draw = draw;
exports.clear = clear;
exports.update = update;
exports.changeShip = changeShip;


function _createElement(title) {
    var subContainer = new PIXI.Container();

    var background = new BackgroundSprite(title);
    subContainer.addChild(background);

    var sprite = new IconSprite(title);
    sprite.x = (subContainer.width - sprite.width) / 2;
    sprite.y = (subContainer.height - sprite.height) / 2;
    subContainer.addChild(sprite);

    return subContainer;
};

var BackgroundSprite = function (_PIXI$Sprite) {
    _inherits(BackgroundSprite, _PIXI$Sprite);

    function BackgroundSprite(title) {
        _classCallCheck(this, BackgroundSprite);

        var _this = _possibleConstructorReturn(this, (BackgroundSprite.__proto__ || Object.getPrototypeOf(BackgroundSprite)).call(this));

        if (title != "empty") _this.texture = PIXI.loader.resources["background-melee-icons"].texture;else _this.texture = PIXI.loader.resources["empty-melee-icons"].texture;

        _this.__name = title;
        return _this;
    }

    _createClass(BackgroundSprite, [{
        key: "active",
        value: function active() {
            if (this.__name != "empty") this.texture = PIXI.loader.resources["background-active-melee-icons"].texture;else this.texture = PIXI.loader.resources["empty-active-melee-icons"].texture;
        }
    }, {
        key: "inactive",
        value: function inactive() {
            if (this.__name != "empty") this.texture = PIXI.loader.resources["background-melee-icons"].texture;else this.texture = PIXI.loader.resources["empty-melee-icons"].texture;
        }
    }, {
        key: "changeShip",
        value: function changeShip(title) {
            this.__name = title;
            if (this.__name != "empty") {
                this.texture = PIXI.loader.resources["background-active-melee-icons"].texture;
            } else {
                this.texture = PIXI.loader.resources["empty-active-melee-icons"].texture;
            };
        }
    }]);

    return BackgroundSprite;
}(PIXI.Sprite);

;

var IconSprite = function (_PIXI$Sprite2) {
    _inherits(IconSprite, _PIXI$Sprite2);

    function IconSprite(title) {
        _classCallCheck(this, IconSprite);

        var _this2 = _possibleConstructorReturn(this, (IconSprite.__proto__ || Object.getPrototypeOf(IconSprite)).call(this));

        if (title != "empty") _this2.texture = PIXI.loader.resources[title + "-melee-icons"].texture;else {
            _this2.texture = PIXI.loader.resources["empty-melee-icons"].texture;
            _this2.visible = false;
        };

        _this2.__name = title;
        return _this2;
    }

    _createClass(IconSprite, [{
        key: "changeShip",
        value: function changeShip(title) {
            this.__name = title;
            if (this.__name != "empty") {
                this.texture = PIXI.loader.resources[title + "-melee-icons"].texture;
                this.visible = true;
            } else {
                this.texture = PIXI.loader.resources["empty-melee-icons"].texture;
                this.visible = false;
            };

            this.__setPosition();
        }
    }, {
        key: "__setPosition",
        value: function __setPosition() {
            this.position.x = (this.parent.width - this.width) / 2;
            this.position.y = (this.parent.height - this.height) / 2;
        }
    }]);

    return IconSprite;
}(PIXI.Sprite);

;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// // settings enemy.js

// // cache
// let container;

// /**
//  * Create the settings scene and place it to root container.
//  * @param { PIXI } PIXI framework
//  * @param { PIXI.Container } root main container of game
//  * @param { Number } wHeight heigh of game canvas
//  * @param { Number } wWidth width of game canvas
//  * @param { Array<String> } list list of melee ships
//  * @param { Number } active active element
//  */
// function draw(PIXI, root, wHeight, wWidth, list, active) {
//     // container for scene
//     container = new PIXI.Container();

//     for (let index = 0, x = 3; index < list.length; index++ , x += 2) {
//         // container for element
//         let subContainer;
//         // check if it empty element or with image
//         if (list[index] != "empty")
//             subContainer = _createFullElement(list[index]);
//         else
//             subContainer = _createEmptyElement();

//         // set position
//         if (index == 6) x = 3; // reset
//         if (index < 6) {
//             subContainer.y = 142;
//             subContainer.x = 40 * index + x;
//         } else {
//             subContainer.x = 40 * (index - 6) + x;
//             subContainer.y = 184;
//         };
//         // add to root
//         container.addChild(subContainer);
//     };

//     // add scene to root container
//     root.addChild(container);
// };

// /**
//  * Update data in menu scene.
//  * @param { Number } active menu element
//  */
// function update(active) {
//     for (let [index, subContainer] of container.children.entries()) {
//         if (subContainer.children.length == 1) { // empty element
//             if (index == active)
//                 subContainer.children[0]
//                     .clear()
//                     .lineStyle(1, 0x580080, 1)
//                     .drawRect(0, 0, 40, 40);
//             else
//                 subContainer.children[0]
//                     .clear()
//                     .lineStyle(1, 0x000068, 1)
//                     .drawRect(0, 0, 40, 40);

//         } else if (subContainer.children.length == 2) { // element with ship
//             if (index == active)
//                 subContainer.children[0]
//                     .clear()
//                     .beginFill(0x580080)
//                     .lineStyle(1, 0x580080, 1)
//                     .drawRect(0, 0, 40, 40)
//                     .endFill();
//             else
//                 subContainer.children[0]
//                     .clear()
//                     .beginFill(0x000B58)
//                     .lineStyle(1, 0x000B58, 1)
//                     .drawRect(0, 0, 40, 40)
//                     .endFill();
//         };
//     };
// };


// function clear() {
//     // remove menu elements
//     for (let subContainer of container.children) {
//         for (let elem of subContainer.children) {
//             if (elem.destroy)
//                 elem.destroy();
//         };
//     };

//     container.parent.removeChild(container);
// };


// export {
//     draw,
//     clear,
//     update
// };


// function _createEmptyElement() {
//     let subContainer = new PIXI.Container();
//     let graphics = new PIXI.Graphics();
//     graphics.lineStyle(1, 0x000068, 1);
//     graphics.drawRect(0, 0, 40, 40);

//     subContainer.addChild(graphics);

//     return subContainer;
// };

// function _createFullElement(title) {
//     let subContainer = new PIXI.Container();
//     let graphics = new PIXI.Graphics();
//     graphics.beginFill(0x000B58);
//     graphics.lineStyle(1, 0x000068, 1);
//     graphics.drawRect(0, 0, 40, 40);
//     graphics.endFill();

//     subContainer.addChild(graphics);

//     let sprite = new PIXI.Sprite(PIXI.loader.resources[`${title}-melee-icons`].texture);
//     sprite.x = (subContainer.width - sprite.width) / 2;
//     sprite.y = (subContainer.height - sprite.height) / 2;

//     subContainer.addChild(sprite);

//     return subContainer;
// };

// settings enemy.js

// cache
var container = void 0;

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { Array<String> } list list of melee ships
 */
function draw(PIXI, root, wHeight, wWidth, list) {
    // container for scene
    container = new PIXI.Container();

    for (var index = 0, x = 3; index < list.length; index++, x += 2) {
        // container for element
        var subContainer = _createElement(list[index]);

        // set position
        if (index == 6) x = 3; // reset
        if (index < 6) {
            subContainer.y = 142;
            subContainer.x = 40 * index + x;
        } else {
            subContainer.x = 40 * (index - 6) + x;
            subContainer.y = 184;
        };

        // add to root
        container.addChild(subContainer);
    };

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data in menu scene.
 * @param { Number } active menu element
 */
function update(active) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var index = _ref2[0];
            var subContainer = _ref2[1];

            if (index == active) {
                subContainer.children[0].active();
            } else {
                subContainer.children[0].inactive();
            };
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
};

/**
 * @param { Number } active number of element to change
 * @param { Object } ship change to this ship
 */
function changeShip(active, title) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = container.children[active].children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var sprite = _step2.value;

            sprite.changeShip(title);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;
};

function clear() {
    // remove menu elements
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = container.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var subContainer = _step3.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = subContainer.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var elem = _step4.value;

                    if (elem.destroy) elem.destroy();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            ;
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

exports.draw = draw;
exports.clear = clear;
exports.update = update;
exports.changeShip = changeShip;


function _createElement(title) {
    var subContainer = new PIXI.Container();

    var background = new BackgroundSprite(title);
    subContainer.addChild(background);

    var sprite = new IconSprite(title);
    sprite.x = (subContainer.width - sprite.width) / 2;
    sprite.y = (subContainer.height - sprite.height) / 2;
    subContainer.addChild(sprite);

    return subContainer;
};

var BackgroundSprite = function (_PIXI$Sprite) {
    _inherits(BackgroundSprite, _PIXI$Sprite);

    function BackgroundSprite(title) {
        _classCallCheck(this, BackgroundSprite);

        var _this = _possibleConstructorReturn(this, (BackgroundSprite.__proto__ || Object.getPrototypeOf(BackgroundSprite)).call(this));

        if (title != "empty") _this.texture = PIXI.loader.resources["background-melee-icons"].texture;else _this.texture = PIXI.loader.resources["empty-melee-icons"].texture;

        _this.__name = title;
        return _this;
    }

    _createClass(BackgroundSprite, [{
        key: "active",
        value: function active() {
            if (this.__name != "empty") this.texture = PIXI.loader.resources["background-active-melee-icons"].texture;else this.texture = PIXI.loader.resources["empty-active-melee-icons"].texture;
        }
    }, {
        key: "inactive",
        value: function inactive() {
            if (this.__name != "empty") this.texture = PIXI.loader.resources["background-melee-icons"].texture;else this.texture = PIXI.loader.resources["empty-melee-icons"].texture;
        }
    }, {
        key: "changeShip",
        value: function changeShip(title) {
            this.__name = title;
            if (this.__name != "empty") {
                this.texture = PIXI.loader.resources["background-active-melee-icons"].texture;
            } else {
                this.texture = PIXI.loader.resources["empty-active-melee-icons"].texture;
            };
        }
    }]);

    return BackgroundSprite;
}(PIXI.Sprite);

;

var IconSprite = function (_PIXI$Sprite2) {
    _inherits(IconSprite, _PIXI$Sprite2);

    function IconSprite(title) {
        _classCallCheck(this, IconSprite);

        var _this2 = _possibleConstructorReturn(this, (IconSprite.__proto__ || Object.getPrototypeOf(IconSprite)).call(this));

        if (title != "empty") _this2.texture = PIXI.loader.resources[title + "-melee-icons"].texture;else {
            _this2.texture = PIXI.loader.resources["empty-melee-icons"].texture;
            _this2.visible = false;
        };

        _this2.__name = title;
        return _this2;
    }

    _createClass(IconSprite, [{
        key: "changeShip",
        value: function changeShip(title) {
            this.__name = title;
            if (this.__name != "empty") {
                this.texture = PIXI.loader.resources[title + "-melee-icons"].texture;
                this.visible = true;
            } else {
                this.texture = PIXI.loader.resources["empty-melee-icons"].texture;
                this.visible = false;
            };

            this.__setPosition();
        }
    }, {
        key: "__setPosition",
        value: function __setPosition() {
            this.position.x = (this.parent.width - this.width) / 2;
            this.position.y = (this.parent.height - this.height) / 2;
        }
    }]);

    return IconSprite;
}(PIXI.Sprite);

;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// settings shipsIcon.js

// cache
var container = void 0,
    sprite = void 0,
    text = void 0;

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { { race: String, name: String, crew: Number, battery: Number, power: Number} } info info about melee ship
 */
function draw(PIXI, root, wHeight, wWidth, info) {
    // container for scene
    container = new PIXI.Container();

    // container position
    container.y = 5;
    container.x = 260;

    // create text element
    text = new PIXI.Text(info.race, { fontFamily: "Arial", fontSize: 10, fill: "black" });
    // create icon image
    sprite = new PIXI.Sprite(PIXI.loader.resources[info.name + "-icons"].texture);

    // if empty doesn't show
    if (info.name != "empty") text.visible = false;

    // add to container
    container.addChild(sprite);
    container.addChild(text);

    sprite.position.x = (55 - sprite.width) / 2;
    sprite.position.y = (55 - sprite.height) / 2;
    text.position.x = (55 - text.width) / 2;

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data
 * @param { { race: String, name: String, crew: Number, battery: Number, power: Number} } info info about melee ship
 */
function update(info) {
    if (info.name == "empty") {
        sprite.texture = PIXI.loader.resources[info.name + "-icons"].texture;
        text.visible = false;

        sprite.position.x = (55 - sprite.width) / 2;
        sprite.position.y = (55 - sprite.height) / 2;
        text.position.x = (55 - text.width) / 2;
    } else {
        sprite.texture = PIXI.loader.resources[info.name + "-icons"].texture;
        text.text = info.race;
        text.visible = true;

        sprite.position.x = (55 - sprite.width) / 2;
        sprite.position.y = (55 - sprite.height) / 2;
        text.position.x = (55 - text.width) / 2;
    };
};

/**
 * full destroy 
 */
function clear() {
    // remove menu elements
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            if (elem.destroy) elem.destroy();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

exports.draw = draw;
exports.clear = clear;
exports.update = update;
exports.pause = pause;
exports.resume = resume;

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// settings shipsList.js

// cache
var container = void 0,
    shipsArray = void 0,
    textsArray = [];

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { Array<{ race: String, name: String, crew: Number, battery: Number, power: Number}> } list array of ships
 * @param { String } name name of active ship
 */
function draw(PIXI, root, wHeight, wWidth, list, name) {
    // container for scene
    container = new PIXI.Container();

    // cache array
    shipsArray = list;

    // create 7 text elements which will be shown users
    for (var _index = 0, y = 0; _index < 8; ++_index, y += 25) {
        var text = new PIXI.Text("", { fontFamily: "Arial", fontSize: 9, fill: "black" });

        text.position.y = y;

        textsArray.push(text);
        container.addChild(text);
    };

    var index = indexOf(shipsArray, name);
    var arrRange = getRange(index);

    renameTextElements(arrRange, name);

    // coordinates
    container.position.x = 260;
    container.position.y = 60;

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data
 * @param { String } name name of active ship
 */
function update(name) {
    if (name == "empty") name = shipsArray[0].name;

    var index = indexOf(shipsArray, name);
    var arrRange = getRange(index);

    renameTextElements(arrRange, name);
};

/**
 * full destroy 
 */
function clear() {
    // remove menu elements
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = container.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            if (elem.destroy) elem.destroy();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;

    container.parent.removeChild(container);
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

exports.draw = draw;
exports.clear = clear;
exports.update = update;
exports.pause = pause;
exports.resume = resume;

// helper func

/**
 * get index of element name field
 * @param { Array<{ race: String, name: String, crew: Number, battery: Number, power: Number}> } arr 
 * @param { String } name 
 * @returns number
 */

function indexOf(arr, name) {
    var value = null;
    for (var index = 0; index < arr.length; index++) {
        if (arr[index].name == name) {
            value = index;
            break;
        };
    };

    return value;
};

function getRange(index) {
    index = Math.floor(index / 7);

    var arr = [];
    var ind = index * 7; // start
    var end = (index + 1) * 7; // end
    // get range
    for (ind; ind < end; ind++) {
        arr.push(ind);
    };

    return arr;
};

function renameTextElements(arrRange, name) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = arrRange.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref = _step2.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var i = _ref2[0];
            var index = _ref2[1];

            var elem = shipsArray[index];
            if (elem) {
                if (elem.name == name) {
                    textsArray[i].text = elem.race + "   " + elem.power + "\n" + elem.name;
                    textsArray[i].style.fill = 0xffff00;
                } else {
                    textsArray[i].text = elem.race + "   " + elem.power + "\n" + elem.name;
                    textsArray[i].style.fill = 0x000000;
                };
            };
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    ;
};

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.melee = undefined;

var _battle = __webpack_require__(218);

var battle = _interopRequireWildcard(_battle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var melee = exports.melee = {
    // main: main,
    battle: battle
}; // import * as main from "./main";

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.update = exports.draw = undefined;

var _init = __webpack_require__(11);

var _players = __webpack_require__(219);

var _stars = __webpack_require__(221);

var container = new _init.PIXI.Container(); // battle.js

var playersContainer = null;
var starsContainer = null;

/**Create the battle scene
 * @param { Array<Object> } players array of players */
function draw(players, stars, size) {
    // add players to view
    playersContainer = new _players.Players(players, size);
    // add stars to view
    starsContainer = new _stars.Stars(stars);

    container.addChild(starsContainer);
    container.addChild(playersContainer);

    // add scene to root container
    _init.root.addChild(container);
};

/**Change position of world elements.
 * @param { Array<Object> } players menu element */
function update(players, stars, size) {
    playersContainer.update(players, size);
    starsContainer.update(stars);
};

/** destroy container */
function clear() {
    // clear all and destroy container
    for (var index = container.children.length - 1; index >= 0; --index) {
        container.children[index].destroy();
    };

    _init.root.removeChild(container);
};

exports.draw = draw;
exports.update = update;
exports.clear = clear;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Players = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(220);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // players.js
// container for Player

var Players = exports.Players = function (_PIXI$Container) {
    _inherits(Players, _PIXI$Container);

    function Players(players, size) {
        _classCallCheck(this, Players);

        // create players
        var _this = _possibleConstructorReturn(this, (Players.__proto__ || Object.getPrototypeOf(Players)).call(this));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var player = _step.value;

                var ship = new _player.Player(player, size);
                _this.addChild(ship);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ;
        return _this;
    }

    _createClass(Players, [{
        key: "update",
        value: function update(players, size) {
            // update each player
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.children.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ref = _step2.value;

                    var _ref2 = _slicedToArray(_ref, 2);

                    var index = _ref2[0];
                    var player = _ref2[1];

                    player.update(players[index], size);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            ;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            // clear all and destroy container
            for (var index = this.children.length - 1; index >= 0; --index) {
                this.children[index].destroy();
            };
            this.destroy();
        }
    }]);

    return Players;
}(PIXI.Container);

;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// player.js

var Player = exports.Player = function (_PIXI$Sprite) {
    _inherits(Player, _PIXI$Sprite);

    function Player(player, size) {
        _classCallCheck(this, Player);

        // cache 
        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

        _this.size = size;
        _this.direction = player.direction;

        var textureName = player.name + "-" + size + "-" + player.direction + ".png";
        _this.texture = PIXI.loader.resources[player.name + "-" + size].textures[textureName];
        _this.anchor.x = 0.5;
        _this.anchor.y = 0.5;
        _this.position.x = player.x;
        _this.position.y = player.y;
        return _this;
    }

    _createClass(Player, [{
        key: "update",
        value: function update(player, size) {
            // update texture of ship if changed direction or size
            if (this.size != size || this.direction != player.direction) {
                var textureName = player.name + "-" + size + "-" + player.direction + ".png";
                this.texture = PIXI.loader.resources[player.name + "-" + size].textures[textureName];

                // cache new values
                this.size = size;
                this.direction = player.direction;
            };

            // update position
            this.position.x = player.x;
            this.position.y = player.y;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.destroy();
        }
    }]);

    return Player;
}(PIXI.Sprite);

;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stars = exports.Stars = function (_PIXI$Container) {
    _inherits(Stars, _PIXI$Container);

    function Stars(stars) {
        _classCallCheck(this, Stars);

        var _this = _possibleConstructorReturn(this, (Stars.__proto__ || Object.getPrototypeOf(Stars)).call(this));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

            for (var _iterator = stars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var star = _step.value;

                var starCreate = new PIXI.Sprite(PIXI.loader.resources[star.name].texture);
                starCreate.anchor.x = 0.5;
                starCreate.anchor.y = 0.5;
                starCreate.position.x = star.x;
                starCreate.position.y = star.y;

                _this.addChild(starCreate);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ;
        return _this;
    }

    _createClass(Stars, [{
        key: "update",
        value: function update(stars) {
            // update position and texture of stars
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.children.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ref = _step2.value;

                    var _ref2 = _slicedToArray(_ref, 2);

                    var index = _ref2[0];
                    var star = _ref2[1];

                    star.position.x = stars[index].x;
                    star.position.y = stars[index].y;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            ;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            // clear all and destroy container
            for (var index = this.children.length - 1; index >= 0; --index) {
                this.children[index].destroy();
            };
            this.destroy();
        }
    }]);

    return Stars;
}(PIXI.Container);

;

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SOUND = undefined;

var _pixi = __webpack_require__(22);

var PIXI = _interopRequireWildcard(_pixi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var SOUND = exports.SOUND = {
    sounds: {
        playCursorMove: function playCursorMove() {
            PIXI.loader.resources["move"].sound.play();
        },
        playEnter: function playEnter() {
            PIXI.loader.resources["enter"].sound.play();
        },
        playSpace: function playSpace() {
            PIXI.loader.resources["space"].sound.play();
        },
        playAlert: function playAlert() {
            PIXI.loader.resources["alert"].sound.play();
        }
    },
    menu: {
        playMusic: function playMusic() {
            PIXI.loader.resources["menu-music"].sound.play({
                loop: true,
                singleInstance: true,
                volume: 0.5
            });
        },
        stopMusic: function stopMusic() {
            PIXI.loader.resources["menu-music"].sound.stop();
        }
    },
    credits: {
        playMusic: function playMusic() {
            PIXI.loader.resources["credits-music"].sound.play({
                loop: true,
                singleInstance: true,
                volume: 0.5
            });
        },
        stopMusic: function stopMusic() {
            PIXI.loader.resources["credits-music"].sound.stop();
        }
    },
    settings: {
        playMusic: function playMusic() {
            PIXI.loader.resources["settings-music"].sound.play({
                loop: true,
                singleInstance: true,
                volume: 0.5
            });
        },
        stopMusic: function stopMusic() {
            PIXI.loader.resources["settings-music"].sound.stop();
        }
    },
    battle: {}
};

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var keyboard = exports.keyboard = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    32: "space",
    17: "ctrl",
    13: "enter"
};

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(93);

var _user_msg = __webpack_require__(94);

var warning = _interopRequireWildcard(_user_msg);

var _loader = __webpack_require__(95);

var _index = __webpack_require__(96);

var _sound = __webpack_require__(222);

var _keyboard = __webpack_require__(223);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// connect to server

// SOUND for game

// load game resources (images, fronts, music etc).
// index.js.  Enter point to app. (client side)

// css. need for webpack.
var socket = new WebSocket('ws://localhost:3000');
// keyboard control

// GUI for draw and render game scene


// UI messages for error and other information


socket.onopen = function () {
    (0, _loader.loader)().on("start", function () {
        // start view loop
        _index.GUI.init();
        // change scene current status
        _index.GUI.scene = "loader";
        // draw loader scene
        _index.GUI.loader.draw();
    }).on("progress", function (loader, resource) {
        // update progress bar and status of loadings file
        _index.GUI.loader.update(resource.url, loader.progress);
    }).on("error", function (err) {
        warning.OnLoadError();
    }).load(function () {
        // last update to loader. All resources loaded successfull.
        _index.GUI.loader.update("Complete", 100);
        // send request on menu elements
        socket.send(JSON.stringify({ scene: "menu", command: "draw_menu" }));
    });
};

socket.onclose = function (event) {
    warning.OnError(event);
};

socket.onerror = function (error) {
    warning.OnError(error);
};

// in fact, main control of game
// sort incoming message
socket.onmessage = function (event) {
    // validate incoming msg if invalid - nothing to do
    var data = validateJSON(event.data);
    if (!data) return;

    switch (data.scene) {
        /****************** MENU ********************/
        case "menu":
            {
                if (data.command == "draw_menu") {
                    // stop showing prev scene 
                    _index.GUI.loader.clear();
                    // set scene status
                    _index.GUI.scene = "menu";
                    // play music
                    //SOUND.menu.playMusic();
                    // draw menu scene
                    _index.GUI.menu.main.draw(data.value);
                } else if (data.command == "update_menu") {
                    // rerender scene
                    _index.GUI.menu.main.update(data.value);
                    // play music
                    _sound.SOUND.sounds.playCursorMove();
                };
            }break;

        case "credits":
            {
                if (data.command == "draw_credits") {
                    // play sound of press key
                    _sound.SOUND.sounds.playEnter();
                    // stop showing prev scene 
                    _index.GUI.menu.main.hide();
                    // change scene status
                    _index.GUI.scene = "credits";
                    // stop menu music and play credits music
                    //SOUND.menu.stopMusic();
                    //SOUND.credits.playMusic();
                    // draw ncredits scene                
                    if (_index.GUI.menu.credits._isDraw) _index.GUI.menu.credits.resume();else _index.GUI.menu.credits.draw(data.value);
                } else if (data.command == "exit_credits") {
                    // play sound of press key
                    _sound.SOUND.sounds.playSpace();
                    // change scene status
                    _index.GUI.scene = "menu";
                    // stop plaing credits music and play menu music
                    //SOUND.credits.stopMusic();
                    //SOUND.menu.playMusic();
                    // stop showing prev scene 
                    _index.GUI.menu.credits.pause();
                    // show menu scene
                    _index.GUI.menu.main.show();
                };
            }break;

        case "create_server":
            {
                if (data.command == "draw") {
                    // play sound of press key
                    _sound.SOUND.sounds.playEnter();
                    // stop showing prev scene 
                    _index.GUI.menu.main.hide();
                    // change scene status
                    _index.GUI.scene = "create_server";
                    // draw create server scene                
                    if (_index.GUI.menu.create_server._isDraw) _index.GUI.menu.create_server.resume();else _index.GUI.menu.create_server.draw(data.value);
                } else if (data.command == "update") {
                    // play music
                    _sound.SOUND.sounds.playCursorMove();
                    // rerender scene
                    _index.GUI.menu.create_server.update(data.value);
                } else if (data.command == "exit") {
                    // play sound of press key
                    _sound.SOUND.sounds.playSpace();
                    // change scene status
                    _index.GUI.scene = "menu";
                    // stop showing prev scene 
                    _index.GUI.menu.create_server.pause();
                    // show menu scene
                    _index.GUI.menu.main.show();
                };
            }break;

        case "join_server":
            {
                if (data.command == "draw") {
                    // play sound of press key
                    _sound.SOUND.sounds.playEnter();
                    // stop showing prev scene 
                    _index.GUI.menu.main.hide();
                    // change scene status
                    _index.GUI.scene = "join_server";
                    // draw create server scene                
                    if (_index.GUI.menu.join_server._isDraw) _index.GUI.menu.join_server.resume(data.value);else _index.GUI.menu.join_server.draw(data.value);
                } else if (data.command == "update") {
                    // play music
                    _sound.SOUND.sounds.playCursorMove();
                    // rerender scene
                    _index.GUI.menu.join_server.update(data.value);
                } else if (data.command == "exit") {
                    // play sound of press key
                    _sound.SOUND.sounds.playSpace();
                    // change scene status
                    _index.GUI.scene = "menu";
                    // stop showing prev scene 
                    _index.GUI.menu.join_server.pause();
                    // show menu scene
                    _index.GUI.menu.main.show();
                } else if (data.command == "refresh") {
                    // stop showing prev scene 
                    _index.GUI.menu.join_server.pause();
                    // draw create server scene                
                    _index.GUI.menu.join_server.resume(data.value);
                };
            }break;

        case "wait":
            {
                if (data.command == "join") {
                    // play sound of press key
                    // SOUND.sounds.playAlert();
                    // stop showing prev scene 
                    _index.GUI.menu.create_server.pause();
                    // change scene status
                    _index.GUI.scene = "wait";
                    // draw waiting scene                
                    if (_index.GUI.menu.wait._isDraw) _index.GUI.menu.wait.resume();else _index.GUI.menu.wait.draw();
                } else if (data.command == "exit") {
                    // play sound of press key
                    _sound.SOUND.sounds.playSpace();
                    // change scene status
                    _index.GUI.scene = "menu";
                    // stop showing prev scene 
                    _index.GUI.menu.wait.pause();
                    // show menu scene
                    _index.GUI.menu.main.show();
                };
            }break;

        /****************** SETTINGS ********************/
        case "settings":
            {
                if (data.command == "draw") {
                    // full clear prev scene                
                    _index.GUI.menu.wait.clear();
                    _index.GUI.menu.join_server.clear();
                    _index.GUI.menu.main.clear();
                    _index.GUI.menu.create_server.clear();
                    _index.GUI.menu.credits.clear();

                    _index.GUI.scene = "settings";

                    // SOUND.menu.stopMusic();
                    // SOUND.settings.playMusic();

                    // draw SETTINGS scene with different elements
                    _index.GUI.settings.background.draw();
                    _index.GUI.settings.main.draw(data.value.list, data.value.active);
                    _index.GUI.settings.yourArmy.draw(data.value.army);
                    _index.GUI.settings.enemyArmy.draw(data.value.army);
                } else if (data.command == "update") {
                    // play music
                    _sound.SOUND.sounds.playCursorMove();
                    // re-render scene
                    _index.GUI.settings.main.update(data.value);
                };
            }break;

        case "your":
            {
                if (data.command == "move") {
                    // moving cursor by your army
                    _sound.SOUND.sounds.playCursorMove();
                    _index.GUI.settings.yourArmy.update(data.value.active);
                    _index.GUI.settings.shipsIcon.update(data.value.info);
                    _index.GUI.settings.shipsList.update(data.value.info.name);
                } else if (data.command == "rewrite") {
                    // rewrite element in your army
                    _sound.SOUND.sounds.playEnter();
                    _index.GUI.settings.yourArmy.rewrite(data.value.active, data.value.title);
                    _index.GUI.settings.shipsList.update(data.value.title);
                    // change scene to ships control
                    _index.GUI.scene = "ships";
                } else if (data.command == "enter") {
                    // enter to control your army (button EDIT in main menu)
                    _sound.SOUND.sounds.playEnter();
                    _index.GUI.scene = "your";
                    _index.GUI.settings.yourArmy.update(data.value.active);
                    _index.GUI.settings.main.pause();

                    if (_index.GUI.settings.shipsIcon._isDraw) {
                        _index.GUI.settings.shipsIcon.resume();
                        _index.GUI.settings.shipsIcon.update(data.value.info);
                        _index.GUI.settings.shipsList.resume();
                        _index.GUI.settings.shipsList.update(data.value.info.name);
                    } else {
                        _index.GUI.settings.shipsIcon.draw(data.value.info);
                        _index.GUI.settings.shipsList.draw(data.value.list, data.value.info.name);
                    };
                } else if (data.command == "exit") {
                    // exit from your army
                    _sound.SOUND.sounds.playSpace();
                    _index.GUI.settings.yourArmy.update(data.value);
                    _index.GUI.settings.shipsIcon.pause();
                    _index.GUI.settings.shipsList.pause();
                    _index.GUI.scene = "settings";
                    _index.GUI.settings.main.resume();
                };
            }break;

        case "enemy":
            {
                if (data.command == "move") {
                    _index.GUI.settings.enemyArmy.update(data.value);
                } else if (data.command == "rewrite") {
                    _index.GUI.settings.enemyArmy.rewrite(data.value.active, data.value.title);
                };
            }break;

        case "ships":
            {
                if (data.command == "move") {
                    _sound.SOUND.sounds.playEnter();
                    _index.GUI.settings.shipsIcon.update(data.value.info);
                    _index.GUI.settings.shipsList.update(data.value.info.name);
                } else if (data.command == "enter") {
                    _sound.SOUND.sounds.playEnter();
                    _index.GUI.scene = "your";
                    _index.GUI.settings.yourArmy.rewrite(data.value.active, data.value.title);
                } else if (data.command == "exit") {
                    _sound.SOUND.sounds.playSpace();
                    _index.GUI.scene = "your";
                    _index.GUI.settings.yourArmy.update(data.value.active);
                    _index.GUI.settings.shipsIcon.update(data.value.info);
                };
            }break;

        /****************** MELEE ********************/
        case "battle":
            {
                if (data.command == "start") {
                    _index.GUI.scene = "battle";
                    _index.GUI.settings.main.clear(); // DEBUG удалить вообще все сцены SETTINGS
                    _index.GUI.settings.background.clear();
                    _index.GUI.settings.enemyArmy.clear();
                    _index.GUI.settings.shipsIcon.clear();
                    _index.GUI.settings.shipsList.clear();
                    _index.GUI.settings.yourArmy.clear();

                    _index.GUI.melee.battle.draw(data.value);
                } else if (data.command == "update") {
                    _index.GUI.melee.battle.update(data.value);
                } else if (data.command == "end") {
                    _index.GUI.melee.battle.clear();
                };
            }break;

        /****************** ERROR *******************/
        case "error":
            {
                warning.OnServerError(data.value);
            }break;
    };
};

// all keyboard press (registered) send to server
document.onkeydown = function (event) {
    // check if key is registred
    if (_keyboard.keyboard[event.keyCode]) {
        socket.send(JSON.stringify({ scene: _index.GUI.scene, value: _keyboard.keyboard[event.keyCode] }));
        event.preventDefault();
    };
};

// helper func
function validateJSON(str) {
    var json = null;
    try {
        json = JSON.parse(str);
    } catch (error) {
        console.log("ERROR, parse json", error);
    };
    return json;
};

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OnError = OnError;
exports.OnClose = OnClose;
exports.OnLoadError = OnLoadError;
exports.OnServerError = OnServerError;
// there are some messages for user like "Can't connect to server" and other
// in future will change to more beaty

function OnError(error) {
    console.log("Error! Can't connect to server :(");
    console.log(error);
};

function OnClose(event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто. Спасибо за игру.');
    } else {
        console.log("Обрыв соеденения :(");
    };
};

function OnLoadError() {
    console.log("Error on loading files :(. Try press F5");
};

function OnServerError(error) {
    console.log("Server error. ", error);
};

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loader = loader;
function loader() {
    return PIXI.loader
    /********************* MENU *********************/
    .add([
    // img
    { name: "menu-img", url: "assets/ui/menu/background.jpg" }, { name: "menu-elem", url: "assets/ui/menu/element.jpg" }, { name: 'menu-music', url: 'assets/ui/menu/menu-music.ogg' },

    // sounds
    { name: 'enter', url: 'assets/ui/sounds/enter.ogg' }, { name: 'move', url: 'assets/ui/sounds/move.ogg' }, { name: "space", url: "assets/ui/sounds/space.ogg" }, { name: "alert", url: "assets/ui/sounds/redalert.ogg" },

    // Credits
    { name: "credits-img", url: "assets/ui/credits/background.png" }, { name: "credits-music", url: "assets/ui/credits/credits-music.ogg" }])

    /******************* SETTINGS *******************/
    .add([
    // img
    { name: "settings-background", url: "assets/ui/settings/background.png" }, { name: "settings-background-element", url: "assets/ui/settings/back-element.png" },
    // sounds
    { name: 'settings-music', url: 'assets/ui/settings/settings-music.ogg' }])

    /******************** SHIPS ICONS ********************/
    .add([{ name: "empty-icons", url: "assets/ships/empty-icons.png" }, { name: "background-melee-icons", url: "assets/ships/background-melee-icons.png" }, { name: "background-active-melee-icons", url: "assets/ships/background-active-melee-icons.png" }, { name: "empty-melee-icons", url: "assets/ships/empty-melee-icons.png" }, { name: "empty-active-melee-icons", url: "assets/ships/empty-active-melee-icons.png" }, { name: "skiff-icons", url: "assets/ships/skiff/skiff-icons.png" }, { name: "skiff-melee-icons", url: "assets/ships/skiff/skiff-melee-icons.png" }, { name: "broodhome-icons", url: "assets/ships/broodhome/broodhome-icons.png" }, { name: "broodhome-melee-icons", url: "assets/ships/broodhome/broodhome-melee-icons.png" }, { name: "dreadnought-icons", url: "assets/ships/dreadnought/dreadnought-icons.png" }, { name: "dreadnought-melee-icons", url: "assets/ships/dreadnought/dreadnought-melee-icons.png" }, { name: "guardian-icons", url: "assets/ships/guardian/guardian-icons.png" }, { name: "guardian-melee-icons", url: "assets/ships/guardian/guardian-melee-icons.png" }])

    /******************** MELEE ********************/
    .add([{ name: "star-blue", url: "assets/ui/melee/star-blue.png" }, { name: "star-white", url: "assets/ui/melee/star-white.png" }, { name: "star-blue-bright", url: "assets/ui/melee/star-blue-bright.png" }])

    /******************** SHIPS SPRITESHEETS ********************/
    .add("dreadnought-sml", "assets/ships/dreadnought/dreadnought-sml.json");
};

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GUI = undefined;

var _init = __webpack_require__(11);

var _loader = __webpack_require__(197);

var loader = _interopRequireWildcard(_loader);

var _index = __webpack_require__(202);

var _main = __webpack_require__(211);

var settingsMain = _interopRequireWildcard(_main);

var _backgraund = __webpack_require__(212);

var settingsBackground = _interopRequireWildcard(_backgraund);

var _your = __webpack_require__(213);

var settingsYour = _interopRequireWildcard(_your);

var _enemy = __webpack_require__(214);

var settingsEnemy = _interopRequireWildcard(_enemy);

var _shipsIcon = __webpack_require__(215);

var shipsIcon = _interopRequireWildcard(_shipsIcon);

var _shipsList = __webpack_require__(216);

var shipsList = _interopRequireWildcard(_shipsList);

var _index2 = __webpack_require__(217);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import variables after init app.
var GUI = exports.GUI = {
    // very important field. control on which scene bind users keypress.
    scene: "",

    // initialization canvas and start game loop.
    init: function init() {
        _init.loopControl.start();
    },


    // global loader scene.
    loader: loader,

    // global menu scene.
    menu: {
        main: {
            _isDraw: false,
            /**
             * Create the menu scene and draw it.
             * @param { {list: Array, active: Number} } data 
             */
            draw: function draw(data) {
                this._isDraw = true;
                _index.menu.main.draw(data.list, data.active);
            },

            /**
            * Update data in menu scene
            * @param { Number } active menu element
            */
            update: function update(active) {
                _index.menu.main.move(active);
            },
            show: function show() {
                _index.menu.main.show();
            },

            // pause
            hide: function hide() {
                _index.menu.main.hide();
            },

            // Stop show menu scene.
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    _index.menu.main.clear();
                };
            }
        },
        join_server: {
            _isDraw: false,
            draw: function draw(data) {
                this._isDraw = true;
                _index.menu.join.draw(data.list, data.active);
            },
            update: function update(active) {
                _index.menu.join.move(active);
            },
            pause: function pause() {
                _index.menu.join.hide();
            },
            resume: function resume(data) {
                _index.menu.join.show(data.list, data.active);
            },
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    _index.menu.join.clear();
                };
            }
        },
        create_server: {
            _isDraw: false,
            // Draw cr_server scene
            draw: function draw(data) {
                this._isDraw = true;
                _index.menu.create.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, data.list, data.active);
            },

            // update scene
            update: function update(activ) {
                _index.menu.create.update(activ);
            },
            resume: function resume() {
                _index.menu.create.resume();
            },
            pause: function pause() {
                _index.menu.create.pause();
            },

            // Stop show cr_server scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    _index.menu.create.clear();
                };
            }
        },
        credits: {
            _isDraw: false,
            /**
             * Draw Credits scene
             * @param { String[] } text 
             */
            draw: function draw(text) {
                this._isDraw = true;
                _index.menu.credits.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, text);
            },
            pause: function pause() {
                _index.menu.credits.pause();
            },
            resume: function resume() {
                _index.menu.credits.resume();
            },

            // Stop show credits scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    _index.menu.credits.clear();
                };
            }
        },
        wait: {
            _isDraw: false,
            draw: function draw() {
                this._isDraw = true;
                _index.menu.wait.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width);
            },
            pause: function pause() {
                _index.menu.wait.pause();
            },
            resume: function resume() {
                _index.menu.wait.resume();
            },
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    _index.menu.wait.clear();
                };
            }
        }
    },

    // *********** SETTINGS ***********
    settings: {
        background: {
            _isDraw: false,
            // Draw scene
            draw: function draw() {
                this._isDraw = true;
                settingsBackground.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width);
            },

            // clear scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsBackground.clear();
                };
            }
        },
        main: {
            _isDraw: false,
            // Draw scene
            draw: function draw(elements, active) {
                this._isDraw = true;
                settingsMain.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, elements, active);
            },

            // update scene
            update: function update(active) {
                settingsMain.update(active);
            },
            resume: function resume() {
                settingsMain.resume();
            },
            pause: function pause() {
                settingsMain.pause();
            },

            // Stop scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsMain.clear();
                };
            }
        },
        yourArmy: {
            _isDraw: false,
            // Draw scene
            draw: function draw(army) {
                this._isDraw = true;
                settingsYour.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, army);
            },

            // update scene
            update: function update(active) {
                settingsYour.update(active);
            },

            // Stop scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsYour.clear();
                };
            },

            // change ship in your army
            rewrite: function rewrite(active, title) {
                settingsYour.changeShip(active, title);
            }
        },
        enemyArmy: {
            _isDraw: false,
            // Draw scene
            draw: function draw(army) {
                this._isDraw = true;
                settingsEnemy.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, army);
            },

            // update scene
            update: function update(active) {
                settingsEnemy.update(active);
            },

            // Stop scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsEnemy.clear();
                };
            },

            // change ship in enemy army
            rewrite: function rewrite(active, title) {
                settingsEnemy.changeShip(active, title);
            }
        },
        shipsIcon: {
            _isDraw: false,
            // Draw scene
            draw: function draw(info) {
                this._isDraw = true;
                shipsIcon.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, info);
            },

            // update scene
            update: function update(info) {
                shipsIcon.update(info);
            },

            // Stop scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    shipsIcon.clear();
                };
            },
            resume: function resume() {
                shipsIcon.resume();
            },
            pause: function pause() {
                shipsIcon.pause();
            }
        },
        shipsList: {
            _isDraw: false,
            // Draw scene
            draw: function draw(list, name) {
                this._isDraw = true;
                shipsList.draw(_init.PIXI, _init.root, _init.renderer.height, _init.renderer.width, list, name);
            },

            // update scene
            update: function update(title) {
                shipsList.update(title);
            },

            // Stop scene
            clear: function clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    shipsList.clear();
                };
            },
            resume: function resume() {
                shipsList.resume();
            },
            pause: function pause() {
                shipsList.pause();
            }
        }
    },

    // *********** BATTLE ***********
    melee: {
        battle: {
            /**Create the battle scene and draw it.
             * @param { Object } data */
            draw: function draw(data) {
                _index2.melee.battle.draw(data.players, data.stars, data.size);
            },

            /** Update data in battle scene
            * @param { Object } data */
            update: function update(data) {
                _index2.melee.battle.update(data.players, data.stars, data.size);
            },

            // Remove battle scene.
            clear: function clear() {
                _index2.melee.battle.clear();
            }
        }
    }
};

/***/ })

},[92]);