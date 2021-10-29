var calcView = (function () {
	return {
		/** ==================== initialize Function Start ==================== */

		/**
		 * calcView 초기화
		 */
		initialize () {
			this.actionType = this.define.TYPEVIEW;
			this.elements = {};
			this.btnOnElements = document.getElementsByClassName(this.define.CLSON);
			this.registerElements();

			document.addEventListener("keydown", (e) => this.doKeyDown(e), false);
			document.addEventListener("keyup", (e) => this.doKeyUp(e), false);
			document.addEventListener(this.isMobile() ? "touchend" : "click", (e) => this.doMouseClick(e), false);
			window.addEventListener("resize", (e) => this.doResize(e), false);

			this.initLayout();
		},
		/**
		 * layout 초기화 함수
		 */
		initLayout () {
			this.getElements(this.define.CLSCALCWRAP).style.display = "block";
			this.clearView();
			this.setCalcWrapTopPosition();
		},
		/**
		 * DOM Element 를 캐시 (등록) 하는 함수.
		 */
		registerElements () {
			let arrBtns = [],
				btnCmds = document.getElementsByClassName(this.define.CLSCMD),
				btnOperrators = document.getElementsByClassName(this.define.CLSOPERATOR),
				btnNums = document.getElementsByClassName(this.define.CLSNUM),
				ele, btn, keyVal;

			this.elements[this.define.CLSCALCWRAP] = document.getElementsByClassName(this.define.CLSCALCWRAP)[0];
			this.elements[this.define.CLSPANELMSG] = document.getElementsByClassName(this.define.CLSPANELMSG)[0];
			this.elements[this.define.CLSPANELINPUT] = document.getElementsByClassName(this.define.CLSPANELINPUT)[0];

			arrBtns = arrBtns.concat(...btnCmds, ...btnOperrators, ...btnNums);

			for (ele of arrBtns) {
				btn = ele.firstElementChild;
				keyVal = this.define.KEYMAP[btn.getAttribute("name")];

				if (keyVal !== undefined) {
					this.elements[keyVal] = btn;
				}
			}
		},

		/** ==================== initialize Function End ==================== */

		/** ==================== Event Handling Function Start ==================== */

		/**
		 * Click (touchend) 이벤트 콜백 함수.
		 * @param  {Object} e 		- 이벤트 정보
		 */
		doMouseClick (e) {
			let target = e.target,
				key = target ? target.getAttribute("name") : "",
				keyVal = this.define.KEYMAP[key];

			if (keyVal !== undefined) {
				this.execCalc(keyVal);
				e.preventDefault();
			}
		},
		/**
		 * keydown 이벤트 콜백 함수.
		 * @param  {Object} e 		- 이벤트 정보
		 */
		doKeyDown (e) {
			let key = e.key,
				keyVal = this.define.KEYMAP[key];

			if (keyVal === undefined) {
				keyVal = this.define.KEYMAP[e.char];
			}

			if (keyVal !== undefined) {
				this.addClass(this.getElements(keyVal), this.define.CLSON);
				this.execCalc(keyVal);
				e.preventDefault();
			}
		},
		/**
		 * keyup 이벤트 콜백 함수.
		 * @param  {Object} e 		- 이벤트 정보
		 */
		doKeyUp (e) {
			if (this.btnOnElements.length) {
				this.removeClass([...this.btnOnElements], this.define.CLSON);
				e.preventDefault();
			}
		},
		/**
		 * resize 이벤트 콜백 함수.
		 * @param  {Object} e 		- 이벤트 정보
		 */
		doResize (e) {
			this.setCalcWrapTopPosition();
		},
		/**
		 * 버튼에 해당하는 기능 실행을 지시하는 (Event Action) 함수.
		 * @param  {(Number|String)} keyVal 		- Event Action Command Name
		 */
		execCalc (keyVal) {
			if (Number.isInteger(keyVal)) {
				this.execNumber(this.define.CMDADDNUM, keyVal);
			} else if (typeof keyVal === "string") {
				if (keyVal === this.define.KEYMAP.Backspace) {
					this.execNumber(this.define.CMDDELNUM, keyVal);
				} else if (keyVal === this.define.KEYMAP.Escape) {
					this.execClear();
				} else {
					this.execOperator(keyVal);
				}
			}
		},
		/**
		 * Number 등록 Event Action 전달 함수.
		 * @param  {String} cmd 				- Event Action Command Name
		 * @param  {Number} val 				- Event Action Value
		 */
		execNumber (cmd, val) {
			this.sendSpecRouter(cmd, this.define.KINDCALC, val);
		},
		/**
		 * 연산자 등록 Event Action 전달 함수.
		 * @param  {String} val 				- Event Action Value (연산자)
		 */
		execOperator (val) {
			let cmd = this.define.CMDOPERATOR;
			this.sendSpecRouter(cmd, this.define.KINDCALC, val);
		},
		/**
		 * 계산기 초기화 Event Action 전달 함수.
		 */
		execClear () {
			let cmd = this.define.CMDCLEAR,
				val = "";
			this.sendSpecRouter(cmd, this.define.KINDCALC, val);
		},

		/**
		 * 계산기 영역의 세로 위치를 중앙에 위치시키는 함수.
		 */
		setCalcWrapTopPosition () {
			let eleCalcWrap = this.getElements(this.define.CLSCALCWRAP),
				winHeight = window.innerHeight,
				wrapHeight = eleCalcWrap.offsetHeight,
				topDiff = winHeight - wrapHeight,
				topPos;
			
			if (topDiff > 0) {
				topPos = (winHeight / 2) - (wrapHeight / 2);

				if (eleCalcWrap.style.top !== topPos + "px") {
					eleCalcWrap.style.top = topPos + "px";
				}
			}
		},

		/** ==================== Event Handling Function End ==================== */

		/** ==================== Model (Module) Binding Function Start ==================== */

		/**
		 * 계산기 Number View 를 갱신 (등록) 하는 함수.
		 * @param {String} val 					- 갱신 값
		 */
		addNumView (val = "0") {
			let eleNumPanel = this.getElements(this.define.CLSPANELINPUT, true),
				valSize = val.replace(/[,|\-|.]/g, "").length,
				addClsName = "";

			eleNumPanel.textContent = val;

			if (valSize > this.define.DEFINEOPTION.numOver) {
				if (valSize > this.define.DEFINEOPTION.numLimit) {
					addClsName = this.define.CLSPANELMAXSIZE;
				} else {
					addClsName = this.define.CLSPANELOVERSIZE;
				}
			}

			this.removeClass(eleNumPanel, [this.define.CLSPANELOVERSIZE, this.define.CLSPANELMAXSIZE]);
			this.addClass(eleNumPanel, addClsName);
		},
		/**
		 * 계산기 Number View 를 갱신 (삭제) 하는 함수.
		 * @param  {String} val 				- 갱신 값
		 */
		delNumView (val) {
			this.addNumView(val);
		},
		/**
		 * 계산기 Panel View (연산 정보) 를 갱신하는 함수.
		 * @param  {String} numVal 				- 계산기 숫자 패널 갱신 값
		 * @param  {String} msgVal 				- 계산기 연산 정보 패널 갱신 값
		 */
		operatorView (numVal, msgVal) {
			if (numVal) {
				this.addNumView(numVal);
			}

			if (msgVal != null) {
				let eleMsgPanel = this.getElements(this.define.CLSPANELMSG, true);
				eleMsgPanel.innerHTML = (msgVal === "" ? this.define.DEFINEOPTION.blankTag : msgVal);
			}
		},
		/**
		 * 계산기 Number View 와 Panel View 를 초기화 하는 함수.
		 * @param  {String} val 				- 계산기 숫자 패널 기본 값
		 */
		clearView (val = "0") {
			let eleMsgPanel = this.getElements(this.define.CLSPANELMSG, true);

			this.addNumView(val);
			eleMsgPanel.innerHTML = this.define.DEFINEOPTION.blankTag;

		},

		/** ==================== Model (Module) Binding Function End ==================== */

		/**
		 * 전달된 element name 에 해당하는 DOM Element (버튼, Wrap) 을 반환하는 함수.
		 * @param  {String}  name    			- Element name
		 * @param  {Boolean} isChild 			- 지정된 Element 의 첫번째 하위 Element 로 반환 여부
		 * @return {(Element|NULL)}          	- 지정된 Element
		 */
		getElements (name, isChild = false) {
			let ele = this.elements[name] || null;

			if (isChild && ele) {
				ele = ele.firstElementChild;
			}

			return ele;
		}
	};
})();