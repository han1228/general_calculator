var calcDefine = (function () {
	const TYPEVIEW = "view",
	TYPEMODULE = "module",
	KINDCALC = "calc",
	CMDADDNUM = "addNum",
	CMDDELNUM = "delNum",
	CMDOPERATOR = "operator",
	CMDCLEAR = "clear",
	VALERROR = "Error",
	CLSCALCWRAP = "calc_wrap",
	CLSPANELMSG = "panel_msg",
	CLSPANELINPUT = "panel_input",
	CLSCMD = "calc_cmd",
	CLSOPERATOR = "calc_operator",
	CLSNUM = "calc_num",
	CLSON = "on",
	CLSPANELOVERSIZE = "over_size",
	CLSPANELMAXSIZE = "max_size",
	// 액션 정보 정의
	DEFINEMODULE = {
		calc : {
			cmd : [CMDADDNUM, CMDDELNUM, CMDOPERATOR, CMDCLEAR],
			view : "calcView",
			module : "calcModule"
		}
	},
	// 키 맵 정의
	KEYMAP = {
		"0" : 0,
		"1" : 1,
		"2" : 2,
		"3" : 3,
		"4" : 4,
		"5" : 5,
		"6" : 6,
		"7" : 7,
		"8" : 8,
		"9" : 9,
		"Esc" : "Escape",
		"Escape" : "Escape",
		"Backspace" : "Backspace",
		"PlusMinus" : "PlusMinus",
		"Enter" : "Equal",
		"=" : "Equal",
		"-" : "Minus",
		"+" : "Plus",
		"/" : "Division",
		"*" : "Multiply",
		"%" : "Percentage",
		"." : "Dot"
	},
	DEFINEOPTION = {
		"numLimit" : 15,			// 계산기 출력 최대 자리수
		"numOver" : 9,				// 계산기 출력 기본 자리수
		"locale" : "ko-KR",			// 계산기 출력 숫자 언어
		"blankTag" : "<br/>"
	};

	return {
		TYPEVIEW, TYPEMODULE,
		KINDCALC,
		CMDADDNUM, CMDDELNUM, CMDOPERATOR, CMDCLEAR,
		VALERROR,
		CLSCALCWRAP, CLSPANELMSG, CLSPANELINPUT, CLSCMD, CLSOPERATOR, CLSNUM, CLSON, CLSPANELOVERSIZE, CLSPANELMAXSIZE,
		DEFINEMODULE, KEYMAP, DEFINEOPTION
	};
})();