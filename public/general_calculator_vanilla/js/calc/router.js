var calcRouter = (function () {
	let views = new Map(),
		modules = new Map();

	return {
		/**
		 * calcRouter 초기화
		 */
		initialize () {
			this.define = window.calcDefine;
			this.util = window.util;

			// View 를 생성하고 Map 에 저장한다.
			this.createClass(this.define.TYPEMODULE);
			this.createClass(this.define.TYPEVIEW);
		},

		/**
		 * Class Super Function
		 */
		Calculator : class {
			constructor (router, define) {
				this.router = router;
				this.define = define;
			}

			sendSpecRouter (cmd, kind, val) {
				this.router.menuRoutes(cmd, kind, val);
			}
		},

		/**
		 * 전달된 type 에 따라 Class 를 생성하고 Map 에 저장.
		 * @param  {String} type 		- Class 생성 타입 (module, view)
		 * @return {Void}
		 */
		createClass (type) {
			let defineModule = this.define.DEFINEMODULE,
				key, item, ins;

			for (key in defineModule) {
				item = defineModule[key][type];

				if (item && window[item]) {
					ins = this.createInstance(window[item]);
					ins.initialize();
					this.setInstance(type, item, ins);
				}
			}
		},

		/**
		 * Class 를 생성하고, 전달받은 대상 Object 를 상속하여 반환.
		 * @param  {Object} classDef 		- Class 생성할 Object
		 * @return {Object}          		- 신규 생성한 Class Instance
		 */
		createInstance (classDef) {
			let newClass = class extends this.Calculator {};
			Object.assign(newClass.prototype, classDef, this.util);

			return new newClass(this, this.define);
		},

		/**
		 * 생성된 Class 를 등록.
		 * @param {String} type 		- Class Type
		 * @param {String} item 		- Class Name
		 * @param {Object} ins  		- Class Instance
		 */
		setInstance (type, item, ins) {
			if (!(item && ins)) {
				return;
			}

			if (type === this.define.TYPEVIEW) {
				views.set(item, ins);
			} else if (type === this.define.TYPEMODULE) {
				modules.set(item, ins);
			}
		},

		/**
		 * 등록된 Class 를 반환.
		 * @param  {String} type 		- Class Type
		 * @param  {String} item 		- Class Name
		 * @return {(Object|NULL)}      - Class Instance
		 */
		getInstance (type, item) {
			let ins;

			if (type === this.define.TYPEVIEW) {
				ins = views.get(item);
			} else if (type === this.define.TYPEMODULE) {
				ins = modules.get(item);
			}

			return ins || null;
		},

		/**
		 * 전달된 Action 에 해당하는 모듈을 실행.
		 * @param  {String} cmd  			- action command (module 실행 메소드명과 일치)
		 * @param  {String} kind 			- action kind (calc/position)
		 * @param  {(String|Object)} val  	- action value
		 * @return {Void}
		 */
		menuRoutes (cmd, kind, val) {
			let moduleInfo = this.define.DEFINEMODULE[kind],
				insModule, insView, execMod, cbView;

			if (!(moduleInfo && moduleInfo.cmd.includes(cmd))) {
				return;
			}

			insModule = this.getInstance(this.define.TYPEMODULE, moduleInfo.module);
			insView = this.getInstance(this.define.TYPEVIEW, moduleInfo.view);

			if (!(insModule && insView)) {
				return;
			}

			execMod = insModule[cmd];
			cbView = insView[`${cmd}${this.util.getUCFirst(this.define.TYPEVIEW)}`];

			if (execMod && cbView) {
				execMod.call(insModule, val, cbView.bind(insView));
			}
		}
	};
})();