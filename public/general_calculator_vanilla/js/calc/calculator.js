(function () {
	/**
	 * Calulator - ECMAScript 6 (React 연습 과제를 위해 Vanilla 로 먼저 계산기를 제작하고 그 기반으로 React 로 구성해보는 연습 프로젝트)
	 * 
	 * file protocol 로 module (import/export) 을 실행할 수 없기 때문에.
	 * 모듈화를 위한 간단한 로직을 구성
	 * 동적 스크립트 호출 단계에서는 babel 을 인식 못하므로, ECMAScript 5 로 구성함.
	 *
	 * calculator_babel.html 		: file protocol 미지원, http protocol 로 접속 해야함. (모든 브라우저 지원)
	 * calculator_none_babel.html 	: file protocol 지원, http protocol 도 당연 지원. (IE 미지원)
	 *
	 * @since 2019.5.16
	 * @author cdhan12@naver.com
	 */
	const STRBABEL = "babel",
	MOBILECSSPATH = "css/calc_mobile.css",
	MOBILEMINWIDTH = 860;

	let path = {
		"calcRouter" : "js/calc/router",
		"calcModule" : "js/calc/calcModule",
		"calcView" : "js/calc/calcView",
		"calcUtil" : "js/calc/util",
		"calcDefine" : "js/calc/define"
	},
	execType = "javascript",
	moduleTimer = null,
	loadModule = function () {
		if (window.calcRouter) {
			// window.calcRouter 가 load 되었으면, 초기화를 진행한다.
			if (moduleTimer) {
				window.clearTimeout(moduleTimer);
				moduleTimer = null;
			}

			window.calcRouter.initialize();
		} else {
			// babel 이용하는 경우, 동적 로딩 스크립트가 해석되는 시간이 필요하므로 module load 를 딜레이 시킨다.
			moduleTimer = window.setTimeout(function() {
				loadModule();
			}, 500);
		}
	},
	errMsg;

	// data-type 속성이 설정된 script 태그가 있는지 확인한다.
	if (document.scripts) {
		let len = document.scripts.length,
			i, scriptNode, dataType;

		for (i = 0; i < len; i++) {
			scriptNode = document.scripts[i];
			dataType = (scriptNode.getAttribute("data-type") || "").toLowerCase();

			if (dataType === STRBABEL) {
				execType = dataType;
				break;
			}
		}
	}

	// 모바일 브라우저 이면, 모바일 전용 css 를 추가로 삽입해 준다. (단 가로 사이즈가 큰 모바일은 삽입하지 않는다.)
	if (/(mobile|android|ipad|iphone)/i.test(window.navigator.userAgent) && window.innerWidth < MOBILEMINWIDTH) {
		let head = document.getElementsByTagName("head")[0],
			newLink;

		if (head) {
			newLink = document.createElement("link");
			newLink.setAttribute("rel", "stylesheet");
			newLink.setAttribute("type", "text/css");
			newLink.setAttribute("href", MOBILECSSPATH);
			head.appendChild(newLink);
		}
	}

	// 미지원 환경으로 접속한 경우는 에러 메세지를 출력하고 실행을 중단한다. 
	if (execType === STRBABEL && window.location.protocol === "file:") {
		errMsg = "file protocol 에서는 Babel 를 사용한 계산기 앱의 실행을 지원하지 않습니다.";
	} else if (execType !== STRBABEL
			&& window.navigator.userAgent.toLowerCase().indexOf("trident") !== -1) {
		errMsg = "IE 브라우저는 ES6 미지원으로 Babel 를 사용하지 않는 버전에서는 실행 할 수 없습니다.";
	}

	if (errMsg) {
		alert(errMsg);
	} else {
		// path 정보의 script 를 동적 호출한다.
		for (let itemKey in path) {
			document.write('<script type="text/' + execType + '" src="' + path[itemKey] + '.js"></script>');
		}
	}

	// Calulator 초기화 실행
	window.addEventListener("load", function () {
		if (errMsg) {
			document.getElementsByClassName("calc_wrap")[0].style.display = "block";
			document.getElementsByClassName("panel_input")[0].firstElementChild.textContent = "Error";
		} else {
			loadModule();
		}
	}, false);

})();