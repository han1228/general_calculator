import React, {Component} from "react";
//import {Map, List} from "immutable";
import CalcTemplate from "./components/CalcTemplate";
import CalcMsgPanel from "./components/CalcMsgPanel";
import CalcInputPanel from "./components/CalcInputPanel";
import CalcBtnPanel from "./components/CalcBtnPanel";
//import CalcDefine from "./components/CalcDefine";
import CalcModule from "./modules/CalcModule";

class App extends Component {
	componentDidMount () {
		CalcModule.initialize();
		this.setCalcWrapTopPosition();
		window.addEventListener("resize", (e) => this.doResize(e), false);
	}

	eleCalcWrap = null

	state = {
		curNumber : "",
		curFormula : "",
		wrapInlineStyle : {display : "block"}
	}

	/**
	 * resize 이벤트 콜백 함수.
	 * @param  {Object} e 		- 이벤트 정보
	 */
	doResize = (e) => {
		this.setCalcWrapTopPosition();
	}

	/**
	 * 계산기 영역의 세로 위치를 중앙에 위치시키는 함수.
	 */
	setCalcWrapTopPosition = () => {
		const eleCalcWrap = this.eleCalcWrap,
			winHeight = window.innerHeight,
			wrapHeight = eleCalcWrap.offsetHeight,
			topDiff = winHeight - wrapHeight;
		
		if (topDiff > 0) {
			let topPos = (winHeight / 2) - (wrapHeight / 2);
			this.setWrapStyleState(topPos + "px");
		}
	}

	/**
	 * 액션 라우트
	 * @param {String} cmd 			- Action Command
	 * @param {*} val 				- Action Value
	 */
	cmdRoute = (cmd, val) => {
		const cmdFunc = CalcModule[cmd];
		let resultVal;

		if (cmdFunc) {
			resultVal = cmdFunc.call(CalcModule, val);
		}

		if (resultVal != null) {
			this.setCalcState(resultVal);
		}
	}

	/**
	 * 계산기 상태값 설정
	 * @param {Object}} resultVal 	- 상태값
	 */
	setCalcState = (resultVal) => {
		if (resultVal.curNumber != null) {
			this.setState({
				curNumber : resultVal.curNumber
			});
		}

		if (resultVal.curFormula != null) {
			this.setState({
				curFormula : resultVal.curFormula
			});
		}
	}

	/**
	 * 계산기 최상위 DOM 레이어 상태값 설정
	 * @param {*} val 				- 상태값
	 */
	setWrapStyleState = (val) => {
		let {wrapInlineStyle} = this.state;

		if (wrapInlineStyle.top !== val) {
			let newWrapStyle = Object.assign({}, wrapInlineStyle, {top : val});
			this.setState({
				wrapInlineStyle : newWrapStyle
			});
		}
	}

	render () {
		console.log(`============== App Render`);
		const {curNumber, curFormula, wrapInlineStyle} = this.state;

		return (
			<div className="calc_wrap" style={wrapInlineStyle} ref={ref => {this.eleCalcWrap = ref}}>
				<CalcTemplate>
					<CalcMsgPanel curFormula={curFormula} />
					<CalcInputPanel curNumber={curNumber} />
					<CalcBtnPanel cmdRoute={this.cmdRoute} />
				</CalcTemplate>
			</div>
		);
	}
}

export default App;