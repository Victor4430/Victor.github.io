/*! For license information please see 726.js.LICENSE.txt */
"use strict";
(self.webpackJsonp = self.webpackJsonp || []).push([
	[726, 6392], {
		"6392": function(e, o, n) {
			n.r(o),
				n.d(o, {
					"a": function() {
						return createCommonjsModule
					},
					"b": function() {
						return i
					},
					"c": function() {
						return s
					},
					"g": function() {
						return getDefaultExportFromCjs
					}
				});
			var i = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window :
				void 0 !== n.g ? n.g : "undefined" != typeof self ? self : {};

			function getDefaultExportFromCjs(e) {
				return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default :
					e
			}

			function createCommonjsModule(e, o, n) {
				return e(n = {
						"path": o,
						"exports": {},
						"require": function(e, o) {
							return function commonjsRequire() {
								throw new Error(
									"Dynamic requires are not currently supported by @rollup/plugin-commonjs"
									)
							}()
						}
					}, n.exports),
					n.exports
			}
			var s = createCommonjsModule((function(e) {
				! function() {
					var o = {}.hasOwnProperty;

					function r() {
						for (var e = [], n = 0; n < arguments.length; n++) {
							var i = arguments[n];
							if (i) {
								var s = typeof i;
								if ("string" === s || "number" === s)
									e.push(i);
								else if (Array.isArray(i)) {
									if (i.length) {
										var u = r.apply(null, i);
										u && e.push(u)
									}
								} else if ("object" === s)
									if (i.toString === Object.prototype.toString)
										for (var a in i)
											o.call(i, a) && i[a] && e.push(a);
									else
										e.push(i.toString())
							}
						}
						return e.join(" ")
					}
					e.exports ? (r.default = r,
						e.exports = r) : window.classNames = r
				}()
			}))
		},
		"726": function(e, o, n) {
			n.r(o),
				n.d(o, {
					"taro_view_core": function() {
						return u
					}
				});
			var i = n(6468),
				s = n(6392),
				u = function() {
					function t(e) {
						(0,
							i.r)(this, e),
						this.onLongPress = (0,
								i.c)(this, "longpress", 7),
							this.startTime = 0,
							this.animation = void 0,
							this.hoverClass = void 0,
							this.hoverStartTime = 50,
							this.hoverStayTime = 400,
							this.hover = !1,
							this.touch = !1
					}
					return t.prototype.onTouchStart = function() {
							var e = this;
							this.hoverClass && (this.touch = !0,
									setTimeout((function() {
										e.touch && (e.hover = !0)
									}), this.hoverStartTime)),
								this.timeoutEvent = setTimeout((function() {
									e.onLongPress.emit()
								}), 350),
								this.startTime = Date.now()
						},
						t.prototype.onTouchMove = function() {
							clearTimeout(this.timeoutEvent)
						},
						t.prototype.onTouchEnd = function() {
							var e = this;
							Date.now() - this.startTime < 350 && clearTimeout(this.timeoutEvent),
								this.hoverClass && (this.touch = !1,
									setTimeout((function() {
										e.touch || (e.hover = !1)
									}), this.hoverStayTime))
						},
						t.prototype.componentDidRender = function() {
							this.el.childNodes.forEach((function(e) {
								e.nodeType === document.COMMENT_NODE && e["s-cn"] && (e[
										"s-cn"] = !1),
									e.nodeType !== document.COMMENT_NODE && e["s-sr"] && (e[
										"s-sr"] = !1)
							}))
						},
						t.prototype.render = function() {
							var e, o = (0,
									s.c)(((e = {})["".concat(this.hoverClass)] = this.hover,
									e)),
								n = {};
							return this.animation && (n.animation = this.animation,
									n["data-animation"] = this.animation),
								(0,
									i.h)(i.H, Object.assign({
									"class": o
								}, n), (0,
									i.h)("slot", null))
						},
						Object.defineProperty(t.prototype, "el", {
							"get": function() {
								return (0,
									i.g)(this)
							},
							"enumerable": !1,
							"configurable": !0
						}),
						t
				}();
			u.style =
				"body,html{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0)}taro-view-core{display:block}"
		}
	}
]);