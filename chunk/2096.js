"use strict";
(self.webpackJsonp = self.webpackJsonp || []).push([
	[2096], {
		"2096": function(t, n, i) {
			i.r(n),
				i.d(n, {
					"taro_input_core": function() {
						return l
					}
				});
			var a = i(6468),
				__awaiter = function(t, n, i, a) {
					function o(t) {
						return t instanceof i ? t : new i((function(n) {
							n(t)
						}))
					}
					return new(i || (i = Promise))((function(i, l) {
						function r(t) {
							try {
								s(a.next(t))
							} catch (t) {
								l(t)
							}
						}

						function u(t) {
							try {
								s(a.throw(t))
							} catch (t) {
								l(t)
							}
						}

						function s(t) {
							t.done ? i(t.value) : o(t.value).then(r, u)
						}
						s((a = a.apply(t, n || [])).next())
					}))
				},
				__generator = function(t, n) {
					var i, a, l, h, p = {
						"label": 0,
						"sent": function() {
							if (1 & l[0])
								throw l[1];
							return l[1]
						},
						"trys": [],
						"ops": []
					};
					return h = {
							"next": u(0),
							"throw": u(1),
							"return": u(2)
						},
						"function" == typeof Symbol && (h[Symbol.iterator] = function() {
							return this
						}),
						h;

					function u(t) {
						return function(n) {
							return s([t, n])
						}
					}

					function s(c) {
						if (i)
							throw new TypeError("Generator is already executing.");
						for (; h && (h = 0,
								c[0] && (p = 0)),
							p;)
							try {
								if (i = 1,
									a && (l = 2 & c[0] ? a.return : c[0] ? a.throw || ((l = a.return) && l
										.call(a),
										0) : a.next) && !(l = l.call(a, c[1])).done)
									return l;
								switch (a = 0,
									l && (c = [2 & c[0], l.value]),
									c[0]) {
									case 0:
									case 1:
										l = c;
										break;
									case 4:
										return p.label++, {
											"value": c[1],
											"done": !1
										};
									case 5:
										p.label++,
											a = c[1],
											c = [0];
										continue;
									case 7:
										c = p.ops.pop(),
											p.trys.pop();
										continue;
									default:
										if (!(l = p.trys,
												(l = l.length > 0 && l[l.length - 1]) || 6 !== c[0] && 2 !==
												c[0])) {
											p = 0;
											continue
										}
										if (3 === c[0] && (!l || c[1] > l[0] && c[1] < l[3])) {
											p.label = c[1];
											break
										}
										if (6 === c[0] && p.label < l[1]) {
											p.label = l[1],
												l = c;
											break
										}
										if (l && p.label < l[2]) {
											p.label = l[2],
												p.ops.push(c);
											break
										}
										l[2] && p.ops.pop(),
											p.trys.pop();
										continue
								}
								c = n.call(t, p)
							} catch (t) {
								c = [6, t],
									a = 0
							} finally {
								i = l = 0
							}
						if (5 & c[0])
							throw c[1];
						return {
							"value": c[0] ? c[1] : void 0,
							"done": !0
						}
					}
				};

			function getTrueType(t, n, i) {
				if ("search" === n && (t = "search"),
					i && (t = "password"),
					void 0 === t)
					return "text";
				if (!t)
					throw new Error("unexpected type");
				return "digit" === t && (t = "number"),
					t
			}

			function fixControlledValue(t) {
				return null != t ? t : ""
			}
			var l = function() {
				function e(t) {
					var n = this;
					(0,
						a.r)(this, t),
					this.onInput = (0,
							a.c)(this, "input", 7),
						this.onPaste = (0,
							a.c)(this, "paste", 7),
						this.onFocus = (0,
							a.c)(this, "focus", 7),
						this.onBlur = (0,
							a.c)(this, "blur", 7),
						this.onConfirm = (0,
							a.c)(this, "confirm", 7),
						this.onChange = (0,
							a.c)(this, "change", 7),
						this.onKeyDown = (0,
							a.c)(this, "keydown", 7),
						this.isOnComposition = !1,
						this.isOnPaste = !1,
						this.onInputExcuted = !1,
						this.handleInput = function(t) {
							t.stopPropagation();
							var i = n,
								a = i.type,
								l = i.maxlength,
								h = i.confirmType,
								p = i.password;
							if (!n.isOnComposition && !n.onInputExcuted) {
								var c = t.target.value,
									f = getTrueType(a, h, p);
								n.onInputExcuted = !0,
									"number" === f && c && l > -1 && l <= c.length && (c = c.substring(
											0, l),
										t.target.value = c),
									n.value = c,
									n.onInput.emit({
										"value": c,
										"cursor": c.length
									}),
									n.onInputExcuted = !1
							}
						},
						this.handlePaste = function(t) {
							t.stopPropagation(),
								n.isOnPaste = !0,
								n.onPaste.emit({
									"value": t.target.value
								})
						},
						this.handleFocus = function(t) {
							t.stopPropagation(),
								n.onInputExcuted = !1,
								n.onFocus.emit({
									"value": t.target.value
								})
						},
						this.handleBlur = function(t) {
							t.stopPropagation(),
								n.onBlur.emit({
									"value": t.target.value
								})
						},
						this.handleChange = function(t) {
							t.stopPropagation(),
								n.onChange.emit({
									"value": t.target.value
								}),
								n.isOnPaste && (n.isOnPaste = !1,
									n.value = t.target.value,
									n.onInput.emit({
										"value": t.target.value,
										"cursor": t.target.value.length
									}))
						},
						this.handleKeyDown = function(t) {
							t.stopPropagation();
							var i = t.target.value,
								a = t.keyCode || t.code;
							n.onInputExcuted = !1,
								n.onKeyDown.emit({
									"value": i,
									"cursor": i.length,
									"keyCode": a
								}),
								13 === a && n.onConfirm.emit({
									"value": i
								})
						},
						this.handleComposition = function(t) {
							t.stopPropagation(),
								t.target instanceof HTMLInputElement && ("compositionend" === t.type ? (
									n.isOnComposition = !1,
									n.value = t.target.value,
									n.onInput.emit({
										"value": t.target.value,
										"cursor": t.target.value.length
									})) : n.isOnComposition = !0)
						},
						this.handleBeforeinput = function(t) {
							if (t.data) {
								var i = t.data && /[0-9]/.test(t.data);
								"number" !== n.type || i || t.preventDefault(),
									"digit" !== n.type || i || ("." !== t.data || "." === t.data && t
										.target.value.indexOf(".") > -1) && t.preventDefault()
							}
						},
						this.value = void 0,
						this.type = void 0,
						this.password = !1,
						this.placeholder = void 0,
						this.disabled = !1,
						this.maxlength = 140,
						this.autoFocus = !1,
						this.confirmType = "done",
						this.name = void 0,
						this.nativeProps = {}
				}
				return e.prototype.focus = function() {
						return __awaiter(this, void 0, void 0, (function() {
							return __generator(this, (function(t) {
								return this.inputRef.focus(),
									[2]
							}))
						}))
					},
					e.prototype.watchAutoFocus = function(t, n) {
						var i;
						!n && t && (null === (i = this.inputRef) || void 0 === i || i.focus())
					},
					e.prototype.watchValue = function(t) {
						var n = fixControlledValue(t);
						this.inputRef.value !== n && (this.inputRef.value = n)
					},
					e.prototype.componentDidLoad = function() {
						var t, n, i, a, l, h = this;
						"file" === this.type ? (this.fileListener = function() {
									h.onInput.emit()
								},
								null === (t = this.inputRef) || void 0 === t || t.addEventListener(
									"change", this.fileListener)) : (null === (n = this.inputRef) ||
								void 0 === n || n.addEventListener("compositionstart", this
									.handleComposition),
								null === (i = this.inputRef) || void 0 === i || i.addEventListener(
									"compositionend", this.handleComposition),
								null === (a = this.inputRef) || void 0 === a || a.addEventListener(
									"beforeinput", this.handleBeforeinput),
								null === (l = this.inputRef) || void 0 === l || l.addEventListener(
									"textInput", this.handleBeforeinput)),
							Object.defineProperty(this.el, "value", {
								"get": function() {
									return h.inputRef.value
								},
								"set": function(t) {
									return h.value = t
								},
								"configurable": !0
							})
					},
					e.prototype.disconnectedCallback = function() {
						var t, n, i, a, l;
						"file" === this.type ? null === (t = this.inputRef) || void 0 === t || t
							.removeEventListener("change", this.fileListener) : (null === (n = this
									.inputRef) || void 0 === n || n.removeEventListener(
									"compositionstart", this.handleComposition),
								null === (i = this.inputRef) || void 0 === i || i.removeEventListener(
									"compositionend", this.handleComposition),
								null === (a = this.inputRef) || void 0 === a || a.removeEventListener(
									"beforeinput", this.handleBeforeinput),
								null === (l = this.inputRef) || void 0 === l || l.removeEventListener(
									"textInput", this.handleBeforeinput))
					},
					e.prototype.render = function() {
						var t = this,
							n = this,
							i = n.value,
							l = n.type,
							h = n.password,
							p = n.placeholder,
							c = n.autoFocus,
							f = n.disabled,
							d = n.maxlength,
							v = n.confirmType,
							g = n.name,
							m = n.nativeProps;
						return (0,
							a.h)("input", Object.assign({
							"ref": function(n) {
								t.inputRef = n,
									c && n && n.focus()
							},
							"class": "weui-input",
							"type": getTrueType(l, v, h),
							"placeholder": p,
							"autoFocus": c,
							"disabled": f,
							"maxlength": d,
							"name": g,
							"onInput": this.handleInput,
							"onFocus": this.handleFocus,
							"onBlur": this.handleBlur,
							"onChange": this.handleChange,
							"onKeyDown": this.handleKeyDown,
							"onPaste": this.handlePaste,
							"onCompositionStart": this.handleComposition,
							"onCompositionEnd": this.handleComposition
						}, m, {
							"value": fixControlledValue(i)
						}))
					},
					Object.defineProperty(e.prototype, "el", {
						"get": function() {
							return (0,
								a.g)(this)
						},
						"enumerable": !1,
						"configurable": !0
					}),
					Object.defineProperty(e, "watchers", {
						"get": function() {
							return {
								"autoFocus": ["watchAutoFocus"],
								"value": ["watchValue"]
							}
						},
						"enumerable": !1,
						"configurable": !0
					}),
					e
			}();
			l.style =
				"taro-input-core{display:block}input{display:block;overflow:hidden;height:1.4rem;text-overflow:clip;text-align:inherit;white-space:nowrap}"
		}
	}
]);