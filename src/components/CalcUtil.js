const CalcUtil = () => {
	return {
		/**
		 * 전달된 문자의 첫문자를 대문자로 변경하여 반환하는 함수
		 * @param  {String} str 		- 대상 문자
		 * @return {String}     		- 변환된 문자
		 */
		getUCFirst (str) {
			if (typeof str !== "string") {
				return "";
			}

			return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
		},
		/**
		 * 전달된 Element 에 className 있는지 여부 반환하는 함수
		 * @param  {Element}  el        		- 대상 Element
		 * @param  {String}  className 			- Class 명
		 * @return {Boolean}           			- className 보유 여부
		 */
		hasClass (el, className) {
			let hasClass = false;

			if (el && className) {
				hasClass = el.classList.contains(className);
			}

			return hasClass;
		},
		/**
		 * 전달된 Element 에 ClassName 등록 하는 함수
		 * @param {(Element|Array)} els         - 대상 Element 또는 대상 Element 를 담은 Array
		 * @param {(String|Array)}	classNames	- 등록할 Classname 또는 Classname 를 담은 Array
		 */
		addClass (els, classNames) {
			if (!(els && classNames)) {
				return;
			}
			
			if (!Array.isArray(els)) {
				els = [els];
			}

			for (let ele of els) {
				if (ele) {
					if (Array.isArray(classNames)) {
						ele.classList.add(...classNames);
					} else {
						ele.classList.add(classNames);
					}
				}
			}
		},
		/**
		 * 전달된 Element 에 ClassName 제거 하는 함수
		 * @param {(Element|Array)} els         - 대상 Element 또는 대상 Element 를 담은 Array
		 * @param {(String|Array)}	classNames	- 제거할 Classname 또는 Classname 를 담은 Array
		 */
		removeClass (els, classNames) {
			if (!(els && classNames)) {
				return;
			}

			if (!Array.isArray(els)) {
				els = [els];
			}

			for (let ele of els) {
				if (ele) {
					if (Array.isArray(classNames)) {
						ele.classList.remove(...classNames);
					} else {
						ele.classList.remove(classNames);
					}
				}
			}
		},
		/**
		 * 접속한 브라우저가 모바일 여부 반환 함수
		 * @return {Boolean} 		- 모바일 여부 반환
		 */
		isMobile () {
			return /(mobile|android|ipad|iphone)/i.test(window.navigator.userAgent);
		}
	};
}

export default CalcUtil();