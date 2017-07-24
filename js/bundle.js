/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(1);

	var _model2 = _interopRequireDefault(_model);

	var _view = __webpack_require__(2);

	var _view2 = _interopRequireDefault(_view);

	var _controller = __webpack_require__(3);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var model = (0, _model2.default)();
	var view = (0, _view2.default)();
	var controller = (0, _controller2.default)();

	controller.init(model, view);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = model;
	//Model
	function model() {
	    return {
	        init: function init() {
	            if (localStorage.getItem("notes") === null) localStorage.setItem("notes", "[]");
	        },

	        add: function add(note) {
	            var allNotes = this.getAllNotes();
	            note = {
	                "id": "note" + allNotes.length,
	                "noteValue": note.charAt(0).toUpperCase() + note.substr(1)
	            };

	            allNotes.push(note);
	            allNotes = JSON.stringify(allNotes);
	            localStorage.setItem("notes", allNotes);
	        },

	        getAllNotes: function getAllNotes() {
	            return JSON.parse(localStorage.getItem("notes"));
	        },

	        removeNote: function removeNote(noteID) {
	            var allNotes = this.getAllNotes();
	            var newNotes = allNotes.filter(function (note) {
	                return note.id != noteID;
	            });
	            newNotes = JSON.stringify(newNotes);
	            localStorage.clear();
	            localStorage.setItem("notes", newNotes);
	        }
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = view;
	//View
	function view() {
	    return {
	        init: function init(controller) {
	            var _this = this;

	            this.controller = controller;
	            this.noteInput = document.querySelector("#noteInput");

	            var addNoteHandler = function addNoteHandler(event) {
	                _this.controller.addNewNote(event.target.value);
	                event.target.value = "";
	            };

	            this.noteInput.addEventListener('change', addNoteHandler);

	            this.render();
	        },

	        render: function render() {
	            var _this2 = this;

	            var noteBlock = document.querySelector("#noteBlock");
	            var allNotes = this.controller.getNotes();

	            var deleteNoteHandler = function deleteNoteHandler(event) {
	                _this2.controller.deleteNote(event.target.id);
	            };

	            if (allNotes != "[]") {
	                noteBlock.innerHTML = "";
	                allNotes.forEach(function (note) {
	                    var newLi = document.createElement('li');
	                    newLi.id = note.id;
	                    newLi.className = "note";
	                    newLi.innerHTML = note.noteValue;
	                    newLi.addEventListener("dblclick", deleteNoteHandler);
	                    noteBlock.appendChild(newLi);
	                });
	            };
	        }
	    };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = controller;
	//Controller
	function controller() {
	    return {
	        init: function init(model, view) {
	            this.model = model;
	            this.view = view;
	            this.model.init();
	            this.view.init(this);
	        },
	        addNewNote: function addNewNote(value) {
	            console.log(value);
	            this.model.add(value);
	            this.view.render();
	        },
	        getNotes: function getNotes() {
	            return this.model.getAllNotes();
	        },
	        deleteNote: function deleteNote(id) {
	            this.model.removeNote(id);
	            this.view.render();
	        }
	    };
	};

/***/ }
/******/ ]);