## general_calculator - ECMAScript 6 & React

React 연습 과제를 위해 Vanilla 로 먼저 계산기를 제작하고 그 기반으로 React 로 구성해보는 연습 프로젝트

### ECMAScript 6 (Vanilla JS)

1. 위치
    * /general_calculator_vanilla

2. 실행
    * calculator_babel.html : 계산기, file protocol 미지원, http protocol 로 접속 해야함. (모든 브라우저 지원)
    * calculator_none_babel.html : 계산기, file protocol 지원, http protocol 도 당연 지원. (IE 미지원)
    * calculator_test.html : 계산기 Unit Test

3. 설명
    * js/calc/calculator.js : 초기화 및 동적 모듈화
    * js/calc/router.js : 클래스 생성 및 액션 라우팅
    * js/calc/calcModule.js : 계산 모듈
    * js/calc/calcView.js : 뷰 모듈 (이벤트 바인딩)
    * js/calc/define.js : 상수 (옵션 정의)
    * js/calc/util.js : 유틸

### React

1. 기반
    * [Create React App] 사용 (https://github.com/facebook/create-react-app).

2. 실행
    * `npm start`

3. 설명
    * App.js : 전역 상태 관리, 액션 라우팅
    * Components/CalcTemplate.js : 템플릿 컴포넌트
    * Components/CalcMsgPanel.js : 계산기 상단 메세지(연산 상태) 패널
    * Components/CalcInputPanel.js : 계산기 연산 결과 패널
    * Components/CalcBtnPanel.js : 계산기 버튼 패널, 이벤트 바인딩 및 액션 생성
    * modules/CalcModule.js : 계산 모듈

