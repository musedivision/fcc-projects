"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_React$Component) {
  _inherits(Circle, _React$Component);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Circle.prototype.mainCircleStyles = function mainCircleStyles() {
    var CIRCLE_DIAM = 250;
    return {
      width: CIRCLE_DIAM,
      height: CIRCLE_DIAM,
      borderRadius: "50%"
    };
  };

  Circle.prototype.tomatoLocation = function tomatoLocation(CIRCLE_DIAM) {
    var _props$state = this.props.state;
    var stopwatch = _props$state.stopwatch;
    var stage = _props$state.stage;
    var pomo = _props$state.pomo;
    var breaks = _props$state.breaks;

    var percent = stopwatch / (stage ? pomo * 60 : breaks * 60);
    var degrees = stage ? percent * 360 - 90 : percent * -360 - 90;
    var radians = degrees * Math.PI / 180;

    var deltaY = Math.sin(radians) / (CIRCLE_DIAM / 2);
    var deltaX = Math.cos(radians) / (CIRCLE_DIAM / 2);
    return {
      deltaY: deltaY * 2500,
      deltaX: deltaX * 2500
    };
  };

  Circle.prototype.tomatoStyles = function tomatoStyles() {
    var diameter = 100;
    var plot = this.tomatoLocation(diameter);
    var icon = 17.5 / 250 * 100;

    return {
      height: "35px",
      width: "35px",
      top: diameter / 2 - icon + plot.deltaY + "%",
      left: diameter / 2 - icon + plot.deltaX + "%",
      position: "relative"
    };
  };

  Circle.prototype.render = function render() {
    var _props$state2 = this.props.state;
    var displayTime = _props$state2.displayTime;
    var stage = _props$state2.stage;
    // for display time

    var minutes = parseInt(displayTime / 60) % 60;
    var seconds = displayTime % 60;
    var session = stage ? "working" : "break";

    return React.createElement(
      "div",
      { className: session + " circle", onClick: this.props.onStartTimer, style: this.mainCircleStyles() },
      React.createElement("img", { className: "tomato",
        style: this.tomatoStyles(), src: "https://www.emojibase.com/resources/img/emojis/hangouts/1f345.png" }),
      React.createElement(
        "div",
        { className: "displayTime" },
        minutes,
        ":",
        seconds < 10 ? "0" + seconds.toString() : seconds,
        React.createElement("br", null),
        stage ? "Work" : "Break!"
      )
    );
  };

  return Circle;
}(React.Component);

var Layout = function (_React$Component2) {
  _inherits(Layout, _React$Component2);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Layout.prototype.render = function render() {
    var _props$timer = this.props.timer;
    var timerStart = _props$timer.timerStart;
    var stopwatch = _props$timer.stopwatch;
    var pomo = _props$timer.pomo;
    var breaks = _props$timer.breaks;
    var stage = _props$timer.stage;
    var displayTime = _props$timer.displayTime;

    var changePomo = this.props.onChangePomo.bind(this);
    var startTimer = this.props.onStartTimer.bind(this);
    var stopTimer = this.props.onStopTimer.bind(this);
    var clearTimer = this.props.onClearTimer.bind(this);
    var switchStage = this.props.onSwitchStage.bind(this);

    // percent prop for circle animation
    var percent = stopwatch / (stage ? pomo * 60 : breaks * 60);

    //     convert to base 60
    var minutes = parseInt(displayTime / 60) % 60;
    var seconds = displayTime % 60;

    return React.createElement(
      "div",
      { className: "col-xs-12 flex" },
      React.createElement(
        "h1",
        { className: "title" },
        "Pomodoro Timer"
      ),
      React.createElement(
        "div",
        { className: "btn-container" },
        React.createElement(
          "div",
          { className: "flex-col" },
          React.createElement(
            "h4",
            null,
            "Session"
          ),
          React.createElement(
            "button",
            { className: "btn btn-danger", type: "submit", onClick: changePomo, value: "-1,pomo" },
            "-"
          ),
          pomo,
          "min",
          React.createElement(
            "button",
            { className: "btn btn-success", type: "submit", onClick: changePomo, value: "1,pomo" },
            "+"
          )
        ),
        React.createElement(
          "div",
          { className: "flex-col" },
          React.createElement(
            "h4",
            null,
            "Break"
          ),
          React.createElement(
            "button",
            { className: "btn btn-danger", type: "submit", onClick: changePomo, value: "-1,breaks" },
            "-"
          ),
          breaks,
          "min",
          React.createElement(
            "button",
            { className: "btn btn-success", type: "submit", onClick: changePomo, value: "1,breaks" },
            "+"
          )
        )
      ),
      React.createElement(Circle, { onStartTimer: startTimer, state: this.props.timer, percent: percent }),
      React.createElement(
        "div",
        { className: "credits" },
        "Made by",
        React.createElement(
          "a",
          { href: "http://musedivision.github.io" },
          "Patrick McCaffrey"
        )
      )
    );
  };

  return Layout;
}(React.Component);

var LayoutContainer = function (_React$Component3) {
  _inherits(LayoutContainer, _React$Component3);

  function LayoutContainer() {
    _classCallCheck(this, LayoutContainer);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this));

    _this3.state = {
      timerStart: 0,
      stopwatch: 0,
      displayTime: 1500,
      stage: 1,
      pomo: 25,
      breaks: 5,
      timerId: 0,
      play: true
    };
    return _this3;
  }

  LayoutContainer.prototype.count = function count() {
    var timerId = setInterval(this.handleState.bind(this), 1000);
    var _state = this.state;
    var stage = _state.stage;
    var pomo = _state.pomo;
    var breaks = _state.breaks;
    var stopwatch = _state.stopwatch;

    var length = (stage ? pomo : breaks) * 60;
    var display = stopwatch < 1 ? length : length - stopwatch;

    this.setState({
      timerId: timerId,
      displayTime: display
    });
  };

  LayoutContainer.prototype.handleChangePomo = function handleChangePomo(e) {
    var play = this.state.play;

    var change = {};
    var btnInfo = e.target.value.split(',');
    var pomo = this.state[btnInfo[1]] + Number(btnInfo[0]);
    change[btnInfo[1]] = pomo;
    // based
    change['displayTime'] = pomo * 60;

    !play ? null : this.setState(change);
  };

  LayoutContainer.prototype.handleState = function handleState() {
    var _state2 = this.state;
    var pomo = _state2.pomo;
    var breaks = _state2.breaks;
    var stage = _state2.stage;
    var stopwatch = _state2.stopwatch;

    stopwatch++;
    var length = (stage ? pomo : breaks) * 60;
    var display = length - stopwatch;

    if (stopwatch <= length) {
      this.setState({
        stopwatch: stopwatch,
        displayTime: display
      });
    } else {
      this.switchStage();
    }
  };

  LayoutContainer.prototype.switchStage = function switchStage() {
    var _state3 = this.state;
    var stage = _state3.stage;
    var play = _state3.play;

    var change = stage ? 0 : 1;
    this.setState({
      stage: change,
      play: !play
    });
    this.clearTimer();
    this.startTimer(change);
  };

  LayoutContainer.prototype.stopTimer = function stopTimer() {
    var _state4 = this.state;
    var timerId = _state4.timerId;
    var play = _state4.play;

    console.log(timerId, ": setInterval timer stopped");
    this.setState({
      play: !play
    });
    clearInterval(timerId);
  };

  LayoutContainer.prototype.clearTimer = function clearTimer() {
    var _state5 = this.state;
    var timerId = _state5.timerId;
    var stage = _state5.stage;
    var pomo = _state5.pomo;
    var breaks = _state5.breaks;

    console.log(timerId, ": setInterval timer cleared");
    clearInterval(timerId);

    // reset  display time and stage
    var length = (stage ? pomo : breaks) * 60;
    this.setState({
      stopwatch: 0,
      stage: 1,
      displayTime: length
    });
  };

  LayoutContainer.prototype.startTimer = function startTimer(change) {
    // if timer is going then stop, otherwise start.
    var _state6 = this.state;
    var play = _state6.play;
    var stage = _state6.stage;

    if (!play) {
      this.stopTimer();
    } else {
      var time = new Date().getTime() / 1000;
      clearInterval(this.state.timerId);
      this.setState({
        timerStart: time,
        stage: change,
        play: !play
      });

      this.count();
    }
  };

  LayoutContainer.prototype.render = function render() {

    return React.createElement(Layout, {
      timer: this.state,

      onChangePomo: this.handleChangePomo.bind(this),
      onStartTimer: this.startTimer.bind(this),
      onStopTimer: this.stopTimer.bind(this),
      onClearTimer: this.clearTimer.bind(this),
      onSwitchStage: this.switchStage.bind(this)
    });
  };

  return LayoutContainer;
}(React.Component);

ReactDOM.render(React.createElement(LayoutContainer, null), document.getElementById('app'));