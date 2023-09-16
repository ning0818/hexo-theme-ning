Ning = {
		debug: !0,
		var: {},
		console: {
			success: e => {
				Ning.debug && console.log(`%c${e}`, "border-left: 5px solid green;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")
			},
			warning: e => {
				Ning.debug && console.log(`%c${e}`, "border-left: 5px solid yellow;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")
			},
			info: e => {
				Ning.debug && console.log(`%c${e}`, "border-left: 5px solid dodgerblue;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")
			},
			error: e => {
				Ning.debug && console.log(`%c${e}`, "border-left: 5px solid red;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")
			},
			debug: e => {
				Ning.debug && console.log(`%c${e}`, "border-left: 5px solid gray;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")
			},
			logo: () => {
				console.log("%c _   _ _            \n | \ | (_)            \n |  \| |_ _ __   __ _ \n | . ` | | '_ \ / _` |\n | |\  | | | | | (_| |\n |_| \_|_|_| |_|\__, | \n                 __/ |\n                |___/ ", "color:white;!important;background:dodgerblue;padding: 3px;text-align: center;")
			}
		},
		plugins: {
			lazyload: function() {
				var e = document.documentElement.clientHeight,
					t = document.querySelectorAll("img[lazyload]");
				Array.prototype.forEach.call(t, (function(t, n) {
					var o, i;
					"" !== t.getAttribute("lazyload") && ((o = t.getBoundingClientRect())
						.bottom >= 0 && o.top < e && ((i = new Image)
							.src = t.getAttribute("lazyload"), i.onload = function() {
								t.src = i.src, Ning.console.success(i.src + " 加载成功");
								let e = new CustomEvent("Ning:lazyload:load", {
									detail: {
										url: i.src,
										dom: t
									}
								});
								document.dispatchEvent(e), window.dispatchEvent(e)
							}, i.onerror = function() {
								t.setAttribute("lazyload", i.src), Ning.console.error(i.src + " 加载失败");
								let e = new CustomEvent("Ning:lazyload:error", {
									detail: {
										url: i.src,
										dom: t
									}
								});
								document.dispatchEvent(e), window.dispatchEvent(e)
							}, t.removeAttribute("lazyload")))
				}))
			},
			read: function() {
				if (0 !== document.body.classList.value.indexOf("read")) {
					document.body.classList.add("read"), document.body.addEventListener("click", Ning.plugins.read);
					let e = new CustomEvent("Ning:read", {
						detail: !0
					});
					document.dispatchEvent(e), window.dispatchEvent(e)
				} else {
					document.body.removeEventListener("click", Ning.plugins.read), document.body.classList.remove("read");
					let e = new CustomEvent("Ning:read", {
						detail: !1
					});
					document.dispatchEvent(e), window.dispatchEvent(e)
				}
			}
		},
		onload: {
			list: [],
			state: !1,
			Promise: function(e, ...t) {
				return new Promise((function(n) {
					n(e(...t))
				}))
			},
			add: function(e, ...t) {
				if (this.state) try {
					e(...t)
				} catch (t) {
					Ning.console.error(t)
				} else this.list.push({
					fn: e,
					e: t
				});
				let n = new CustomEvent("Ning:add_onload", {
					detail: {
						fn: e,
						e: t
					}
				});
				document.dispatchEvent(n), window.dispatchEvent(n)
			},
			run: function(e = !1) {
				if (this.state) return 0;
				this.state = !0;
				for (let e = 0; e < this.list.length; e++) try {
					this.Promise(this.list[e].fn, ...this.list[e].e)
						.then()
				} catch (e) {
					Ning.console.error(e)
				}
				let t = new CustomEvent("Ning:onload", {
					detail: {
						list: this.list
					}
				});
				document.dispatchEvent(t), window.dispatchEvent(t)
			}
		},
		dark: {
			set: function(e) {
				Ning.console.info(e ? "切换为暗色模式" : "切换为亮色模式"), "boolean" != typeof e && Ning.console.error("set(n),n must be a boolean"), Ning.var.dark = e;
				let t = new CustomEvent("Ning:dark_set", {
					detail: Ning.var.dark
				});
				document.dispatchEvent(t), window.dispatchEvent(t), localStorage.setItem("dark", e), e ? document.body.classList.add("dark") : document.body.classList.remove("dark")
			},
			change: function() {
				Ning.var.dark ? this.set(!1) : this.set(!0)
			}
		},
		load: {
			js: function(e, t = void 0) {
				Ning.onload.add((function(e, t) {
					var n = document.createElement("script");
					t = t || function() {};
					window.dispatchEvent(new CustomEvent("Ning:onload_js", {
						detail: {
							url: e,
							fn: t
						}
					})), n.type = "text/javascript", n.onload = function() {
						Ning.console.success(e + " 加载成功"), t()
					}, n.onerror = function() {
						Ning.console.error(e + " 加载失败")
					}, n.src = e, document.getElementsByTagName("head")[0].appendChild(n)
				}), e, t)
			},
			css: function(e, t = void 0) {
				Ning.onload.add((function(e, t = void 0) {
					var n = document.createElement("link");
					t = t || function() {};
					window.dispatchEvent(new CustomEvent("Ning:onload_css", {
						detail: {
							url: e,
							fn: t
						}
					})), n.rel = "stylesheet", n.href = e, n.onload = function() {
						Ning.console.success(e + " 加载成功"), t()
					}, n.onerror = function() {
						Ning.console.error(e + " 加载失败")
					}, document.getElementsByTagName("head")[0].appendChild(n)
				}), e, t)
			}
		},
		msg: function(e) {
			document.msg = document.getElementById("msg");
			let t = `MsgCard-${(new Date).getTime()}`;
			document.msg.innerHTML = `<div class="card w-full ${e.color?"color-"+e.color+"-full":""}" id="${t}"><div><div class="title"><i class="${e.icon||""}"></i> ${e.title||""}</div><div class="text">${e.msg||e.text||""}</div></div></div>` + document.msg.innerHTML, "function" == typeof e.click && document.getElementById(t)
				.addEventListener("click", e.click);
			let n = new CustomEvent("Ning:onmsg", {
				detail: e
			});
			document.dispatchEvent(n), window.dispatchEvent(n), setTimeout((function(e) {
				let t = new CustomEvent("Ning:add_onload", {
					detail: e
				});
				document.dispatchEvent(t), window.dispatchEvent(t), document.getElementById(e)
					.remove()
			}), e.timeout || 3e3, t)
		}
	}, DOMLoadStartTime = (new Date)
	.getTime(), window.addEventListener("DOMContentLoaded", (function() {
		Ning.console.info("DOM加载完毕, 用时" + ((new Date)
				.getTime() - DOMLoadStartTime)
			.toString() + "ms"), "true" === localStorage.getItem("dark") && Ning.dark.set(!0), Ning.console.logo(), Ning.onload.run(), document.documentElement.offsetWidth > 672 ? document.getElementsByClassName("menu")[0].style.display = "flex" : document.getElementsByClassName("menu")[0].style.display = "none"
	})), "/" !== window.location.pathname[window.location.pathname.length - 1] && -1 === window.location.pathname.split("/")[0].indexOf(".") && "/" !== window.location.pathname && history.pushState({}, "", window.location.pathname + "/"), window.addEventListener("resize", (function() {
		document.documentElement.offsetWidth > 672 ? document.getElementsByClassName("menu")[0].style.display = "flex" : document.getElementsByClassName("menu")[0].style.display = "none"
	}));