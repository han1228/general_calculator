import React, {Component} from "react";
import CalcDefine from "./CalcDefine";

class CalInputPanel extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		return this.props.curNumber !== nextProps.curNumber;
	}

	getInputPanelClsName = (val) => {
		let valSize = val.replace(/[,|\-|.]/g, "").length,
			addClsName = "";

		if (valSize > CalcDefine.DEFINEOPTION.numOver) {
			if (valSize > CalcDefine.DEFINEOPTION.numLimit) {
				addClsName = CalcDefine.CLSPANELMAXSIZE;
			} else {
				addClsName = CalcDefine.CLSPANELOVERSIZE;
			}
		}

		return addClsName;
	}

	render () {
		console.log(`============== CalInputPanel Render`);
		const {curNumber} = this.props;

		return (
			<tr>
				<td colSpan="4" className="panel_input">
					<span className={this.getInputPanelClsName(curNumber)}>{curNumber || "0"}</span>
				</td>
			</tr>
		);
	}
}

export default CalInputPanel;