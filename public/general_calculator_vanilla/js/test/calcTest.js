const define = window.calcDefine,
textCommand = {
	"singleFunc" : {
		"number" : {
			"title" : "숫자 (Number) 테스트",
			"operation" : [
				["1", "한자리 숫자"],
				["25", "두자리 숫자"],
				["369", "세자리 숫자"],
				["1,024", "네자리 숫자", "네자리 이상은 세자리 마다 콤마 (locale string) 가 포함"],
				["10,241,024", "여덟자리 숫자", "네자리 이상은 세자리 마다 콤마 (locale string) 가 포함"]
			]
		},
		"operator" : {
			"title" : "연산자 (Operator) 테스트",
			"operation" : [
				[".", "소수점 입력 (숫자 없는 상태)", "0 이 자동으로 포함", "0."],
				[["0", "."], "소수점 입력 (기존 숫자가 0 입력 상태)", "", "0."],
				[["1", "."], "소수점 입력 (숫자 입력 상태)", "", "1."],
				[["10", "PlusMinus"], "양수/음수 전환", "", "-10"],
				[["10", "%"], "퍼센트 (* 0.01)", "", "0.1"],
				[["1", "Backspace"], "숫자 한자리 지우기 ", "", "0"],
				["Escape", "계산기 초기화", "History 를 제외하고 모두 삭제됨", "0"],
				[["1", "+"], "덧셈 연산자 등록", "현재 숫자에 덧셈 연산자 추가", "1", true],
				[["1", "-"], "뺄셈 연산자 등록", "현재 숫자에 뺄셈 연산자 추가", "1", true],
				[["1", "*"], "곱셈 연산자 등록", "현재 숫자에 곱셈 연산자 추가", "1", true],
				[["1", "/"], "나눗셈 연산자 등록", "현재 숫자에 나눗셈 연산자 추가", "1", true],
				[["1", "+", "2", "="], "연산 실행", "", "3"]
			]
		}
	},
	"multiFunc" : {
		"ArithmeticOperation" : {
			"title" : "복합 사칙연산 테스트",
			"operation" : [
				[["1", "+", "2", "+", "3", "+", "4", "+", "5", "+", "6", "+", "7", "+", "8", "+", "9", "+", "10", "="], "연산 실행 (복합 덧셈)", "", "55"],
				[["256", "*", "2", "-", "512", "/", "2", "+", "256", "="], "연산 실행 (복합 사칙연산 : 곱하기 > 빼기 > 나누기 > 더하기)", "", "256"],
				[["256", "-", "2", "/", "512", "+", "2", "*", "256", "="], "연산 실행 (복합 사칙연산 : 빼기 > 나누기 > 더하기 > 곱하기)", "", "639"],
				[["256", "/", "2", "+", "512", "*", "2", "-", "256", "="], "연산 실행 (복합 사칙연산 : 나누기 > 더하기 > 곱하기 > 빼기)", "", "1,024"],
				[["256", "+", "2", "*", "512", "-", "2", "/", "256", "="], "연산 실행 (복합 사칙연산 : 더하기 > 곱하기 > 빼기 > 나누기)", "", "515.9921875"],
				[["12.4", "*", "30", "/", "0.5", "+", "100", "-", "12.5", "="], "연산 실행 (복합 소수점 사칙연산 : 곱하기 > 나누기 > 더하기 > 빼기)", "", "831.5"],
				[["12.4", "/", "30", "+", "0.5", "-", "100", "*", "12.5", "="], "연산 실행 (복합 소수점 사칙연산 : 나누기 > 더하기 > 빼기 > 곱하기)", "", "-1,238.5833333333335"],
				[["12.4", "+", "30", "-", "0.5", "*", "100", "/", "12.5", "="], "연산 실행 (복합 소수점 사칙연산 : 더하기 > 빼기 > 곱하기 > 나누기)", "", "335.2"],
				[["12.4", "-", "30", "*", "0.5", "/", "100", "+", "12.5", "="], "연산 실행 (복합 소수점 사칙연산 : 빼기 > 곱하기 > 나누기 > 더하기)", "", "12.412"]
			]
		},
		"MultipleSituation" : {
			"title" : "복합 상황 연산 테스트",
			"operation" : [
				[["48", "/", "2", "+", "25", "-", "0", "88", "="], "숫자와 연산자 입력 -> 0 입력 -> 다른 숫자 입력 후 연산 실행 (0 다음에 숫자가 오면 0 은 삭제 처리)", "", "-39"],
				[["48", "/", "2", "+", "25", "=", "0", "0", "88", "*", "2", "="], "연산 실행 -> 0 두번 입력 -> 다른 숫자 입력 후 연산 실행 (0 다음에 숫자가 오면 0 은 삭제 처리)", "", "176"],
				[["128", "/", "4", "+", "25", "-", "88", "=", "="], "연산 실행 -> 숫자 입력 없이 다시 연산 실행 (마지막 연산 다시 실행)", "", "-119"],
				[["128", "/", "4", "+", "25", "-", "88", "=", "9", "Backspace", "="], "연산 실행 -> 숫자 입력 -> 숫자 삭제 (현재 0) -> 연산 실행 (현재 값(0) 과 마지막 연산 실행)", "", "-88"],
				[["128", "/", "4", "+", "25", "-", "9", "Backspace", "="], "연산자 복합 등록 (현재 숫자 없이 연산자가 최종 등록) -> 숫자 입력 -> 숫자 삭제 (현재 0) -> 연산 실행 (현재 값(0) 과 마지막 연산 정보로 실행)", "", "57"],
				[["128", "/", "4", "+", "25", "-", "="], "연산자 복합 등록 (현재 숫자 없이 연산자가 최종 등록) -> 연산 실행 (현재 값을 포함하여 연산 실행)", "", "0"],
				[["128", "/", "4", "+", "25", "=", "9", "="], "연산 실행 -> 숫자 입력 -> 연산실행 (현재 숫자와 마지막 연산 정보로 실행)", "", "34"],
			]
		}
	}
};
let insCalcView;

function getCalcViewIns () {
	const type = define.TYPEVIEW,
		moduleInfo = define.DEFINEMODULE[define.KINDCALC];

	return window.calcRouter.getInstance(type, moduleInfo.view);
}

function getElePanelInput () {
	return insCalcView.getElements(define.CLSPANELINPUT, true);
}

function getElePanelMsg () {
	return insCalcView.getElements(define.CLSPANELMSG, true);
}

function getStrFormulaVal (formula) {
	let lastIndex = formula.length - 1,
		lastItem = formula[lastIndex];

	if (lastItem === "=") {
		formula = formula.slice(0, lastIndex);
	}

	return formula.join(" ");
}

function doCalcTest (cmd) {
	insCalcView.doKeyDown({
		"key" : cmd,
		"preventDefault" : () => {}
	});
}

function execCalcTest (val, isSpread) {
	if (!val) {
		return;
	}

	let testVal = val.replace(/[ |\,]/g, ""),
		arrVal = isSpread ? [...testVal] : [testVal];

	for (let cmd of arrVal) {
		doCalcTest (cmd);
	}
}

function keyClear () {
	insCalcView.doKeyUp({
		"preventDefault" : () => {}
	});
}

function initTest () {
	let eleCalcWrap = insCalcView.getElements(define.CLSCALCWRAP);
	
	eleCalcWrap.style.right = "0px";
	eleCalcWrap.style.left = "initial";
	eleCalcWrap.style.marginLeft = "initial";
}

function doTest (testList) {
	for (let key in testList) {
		let testObj = testList[key];

		describe(testObj.title, () => {
			const testInfo = testObj.operation;

			for (let item of testInfo) {
				let [testVal, subTitle, moreMsg, expectVal, isPanelMsgExpect] = item,
					strMoreMsg = moreMsg ? " - " + moreMsg : "",
					strExpectVal = expectVal ? " (" + expectVal + ")" : "",
					testSubTitle = `${subTitle} : ${testVal}${strMoreMsg}${strExpectVal}`;

				it (testSubTitle, () => {
					if (!Array.isArray(testVal)) {
						testVal = [testVal];
					}

					for (let cmdVal of testVal) {
						execCalcTest(cmdVal, isNaN(cmdVal.replace(/[ |\,]/g, "")) === false);
					}

					expect(getElePanelInput().textContent).toEqual(expectVal || testVal.join(""));

					if (isPanelMsgExpect) {
						expect(getElePanelMsg().textContent).toEqual(getStrFormulaVal(testVal));
					}
				});
			}
		});
	}
}

describe("Calculator", () => {

	beforeAll(() => {
		insCalcView = getCalcViewIns();
		initTest();
	});

	beforeEach(() => {
		execCalcTest("Escape");
	});

	afterEach(() => {
		keyClear();
	});

	describe("계산기 단일 기능 테스트", () => {
		doTest(textCommand.singleFunc);		
	});

	describe("계산기 복합 연산 테스트", () => {
		doTest(textCommand.multiFunc);		
	});
});