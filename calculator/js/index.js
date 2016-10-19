"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    var _props = this.props;
    var number = _props.number;
    var onButtonPress = _props.onButtonPress;
    var addClass = _props.addClass;

    return React.createElement(
      "button",
      { className: "btn btn-default" + addClass, value: number, onClick: onButtonPress },
      number
    );
  };

  return Button;
}(React.Component);

var Layout = function (_React$Component2) {
  _inherits(Layout, _React$Component2);

  function Layout() {
    _classCallCheck(this, Layout);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = {
      currentValue: 0,
      equationCache: []
    };
    return _this2;
  }

  Layout.prototype.clear = function clear() {
    this.setState({
      currentValue: ' ',
      equationCache: []
    });
  };

  Layout.prototype.handleAnswer = function handleAnswer(answer) {
    this.setState({
      currentValue: answer,
      equationCache: [answer]
    });
  };

  Layout.prototype.calculate = function calculate() {
    var array = this.state.equationCache;
    var operators = {
      "+": function _(a, b) {
        return a + b;
      },
      "-": function _(a, b) {
        return a - b;
      },
      "÷": function _(a, b) {
        return a / b;
      },
      "×": function _(a, b) {
        return a * b;
      }
    };
    // BEDMAS calc the x and / first
    array.forEach(function (curr, i) {
      var prev = array[i - 1];
      var replace = 0;
      if (prev === "÷" || prev === "×") {
        replace = operators[prev](array[i - 2], curr);
        array[i] = replace;
        array[i - 1] = "delete";
        array[i - 2] = "delete";
      }
    });
    // filter out already calced values
    var onlyPlusMinus = array.filter(function (item) {
      if (item === "delete") {
        return false;
      } else {
        return true;
      }
    });

    var finalAnswer = onlyPlusMinus.reduce(function (prev, curr, i, arr) {
      if (curr === "+" || curr === "-") {
        return operators[curr](Number(arr[i + 1]), Number(prev));
      } else {
        return 0 + Number(prev);
      }
    });
    //show equation
    var blah = this.state.equationCache;
    blah.push("=" + finalAnswer);
    console.log(blah);
    this.handleAnswer(finalAnswer);
  };

  Layout.prototype.numberString = function numberString(equation, current) {
    var prev = equation[equation.length - 1];
    if (!isNaN(Number(current)) && !isNaN(Number(prev))) {
      equation[equation.length - 1] = prev + current;
    } else if (prev === "." && !isNaN(Number(current)) || current === "." && !isNaN(Number(prev))) {
      equation[equation.length - 1] = prev + current;
    } else {
      equation.push(current);
    }
    return equation;
  };

  // collecting values from my button presses

  Layout.prototype.handleButtonPress = function handleButtonPress(e) {
    var current = e.target.value;
    var equation = this.state.equationCache;

    // check if last value was a number if yes then add strings together.
    this.numberString(equation, current);

    this.setState({
      currentValue: current,
      equationCache: equation
    });
  };

  Layout.prototype.render = function render() {
    var numberPress = this.handleButtonPress.bind(this);
    var equals = this.calculate.bind(this);
    var clear = this.clear.bind(this);

    var mainNum = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0"].map(function (item, i) {
      return React.createElement(Button, { key: i, number: item, addClass: " col-xs-4 main-btn", onButtonPress: numberPress });
    });

    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-xs-12" },
        React.createElement(
          "div",
          { className: "current" },
          this.state.currentValue
        ),
        React.createElement(
          "div",
          { className: "equation" },
          this.state.equationCache.join(' ')
        ),
        React.createElement(
          "div",
          { className: "col-xs-9 numbers" },
          mainNum,
          React.createElement(Button, { number: "=", addClass: " col-xs-4 main-btn", onButtonPress: equals })
        ),
        React.createElement(
          "div",
          { className: "col-xs-3" },
          React.createElement(Button, { number: "CLR", addClass: " col-xs-12 fn-btn", onButtonPress: clear }),
          React.createElement(Button, { number: "÷", addClass: " col-xs-12 fn-btn", onButtonPress: numberPress }),
          React.createElement(Button, { number: "×", addClass: " col-xs-12 fn-btn", onButtonPress: numberPress }),
          React.createElement(Button, { number: "-", addClass: " col-xs-12 fn-btn", onButtonPress: numberPress }),
          React.createElement(Button, { number: "+", addClass: " col-xs-12 fn-btn", onButtonPress: numberPress })
        )
      )
    );
  };

  return Layout;
}(React.Component);

ReactDOM.render(React.createElement(Layout, null), document.getElementById('app'));