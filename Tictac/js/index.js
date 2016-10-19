"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Instructions = function (_React$Component) {
  _inherits(Instructions, _React$Component);

  function Instructions() {
    _classCallCheck(this, Instructions);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Instructions.prototype.render = function render() {
    var instructions = this.props.state.instructions;

    var style = !instructions ? "hide" : "" + " intromodal text-center";

    return React.createElement(
      "div",
      { className: style },
      React.createElement(
        "h1",
        null,
        "Tic Tac Toe"
      ),
      React.createElement(
        "p",
        { className: "words" },
        " The ancient game of noughts and crosses. "
      ),
      React.createElement(
        "p",
        null,
        "Long before machines beat man at chess, they had dominated him at Tic Tac Toe."
      ),
      React.createElement(
        "p",
        null,
        "Can you help man triumph over the machines once more?"
      ),
      React.createElement(
        "div",
        { className: "center-flex" },
        React.createElement(
          "button",
          { className: "btn btn-success btn-lg start", onClick: this.props.handleReset.bind(this) },
          "START"
        )
      )
    );
  };

  return Instructions;
}(React.Component);

var Intro = function (_React$Component2) {
  _inherits(Intro, _React$Component2);

  function Intro() {
    _classCallCheck(this, Intro);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Intro.prototype.render = function render() {
    var intro = this.props.state.intro;

    var style = !intro ? "hide" : "" + " intromodal text-center";

    return React.createElement(
      "div",
      { className: style },
      React.createElement(
        "h1",
        null,
        "Choose your weapon?"
      ),
      React.createElement(
        "div",
        { className: "choose center-flex" },
        React.createElement(
          "button",
          { className: "btn btn-primary btn-lg weapon", value: "X", onClick: this.props.handleChoice.bind(this) },
          "X"
        ),
        React.createElement(
          "button",
          { className: "btn btn-primary btn-lg weapon", value: "O", onClick: this.props.handleChoice.bind(this) },
          "O"
        )
      )
    );
  };

  return Intro;
}(React.Component);

var Win = function (_React$Component3) {
  _inherits(Win, _React$Component3);

  function Win() {
    _classCallCheck(this, Win);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Win.prototype.render = function render() {
    var _props$state = this.props.state;
    var finished = _props$state.finished;
    var winner = _props$state.winner;

    var style = !finished ? "hide" : "" + " intromodal text-center";
    //     change image for winner
    var terminator = winner === "The Machines have Won" || winner === "A Draw" ? "terminator" : "hide";
    var image = winner === "A Draw" ? "http://www.pngmart.com/files/1/Cross-Sword.png" : "http://www.pngmart.com/files/2/Terminator-PNG-HD.png";

    return React.createElement(
      "div",
      { className: style },
      React.createElement(
        "h1",
        null,
        winner
      ),
      React.createElement(
        "div",
        { className: "center-flex flex-col" },
        React.createElement("img", { src: image, className: terminator }),
        React.createElement(
          "button",
          { className: "btn btn-lg btn-danger", onClick: this.props.handleReset.bind(this) },
          "Try Again?"
        )
      )
    );
  };

  return Win;
}(React.Component);

var Game = function (_React$Component4) {
  _inherits(Game, _React$Component4);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Game.prototype.render = function render() {
    var _props$state2 = this.props.state;
    var piece = _props$state2.piece;
    var human = _props$state2.human;
    var computer = _props$state2.computer;
    var _props = this.props;
    var handleChoice = _props.handleChoice;
    var handleCheck = _props.handleCheck;
    var handleReset = _props.handleReset;

    function mark(array, buttonNumber) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === buttonNumber) {
          return true;
        }
      }
    }

    var pc = piece === "X" ? "O" : "X";

    var grid = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (item, i) {
      return React.createElement(
        "button",
        {
          key: i,
          className: "col-xs-4 g",
          onClick: handleCheck.bind(null, i) },
        " ",
        mark(human, i) ? piece : "",
        mark(computer, i) ? pc : "",
        "   "
      );
    }.bind(this));

    return React.createElement(
      "div",
      { className: "col-xs-12 col-lg-8 col-lg-offset-2 main" },
      React.createElement(
        "div",
        { className: "" },
        React.createElement(
          "h1",
          { className: "text-center" },
          " "
        ),
        React.createElement(Instructions, { handleReset: handleReset.bind(this), state: this.props.state }),
        React.createElement(Intro, { handleChoice: handleChoice, state: this.props.state }),
        React.createElement(Win, { handleReset: handleReset.bind(this), state: this.props.state }),
        grid,
        React.createElement(
          "button",
          { className: "btn btn-success center", onClick: handleReset.bind(this) },
          "RESET"
        )
      )
    );
  };

  return Game;
}(React.Component);

var GameContainer = function (_React$Component5) {
  _inherits(GameContainer, _React$Component5);

  function GameContainer() {
    _classCallCheck(this, GameContainer);

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this));

    _this5.state = {
      intro: false,
      instructions: true,
      piece: "",
      finished: false,
      human: [],
      computer: [],
      winner: false,
      winning: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    };
    return _this5;
  }

  GameContainer.prototype.reset = function reset() {
    var startAgain = {
      human: [],
      computer: [],
      intro: true,
      instructions: false,
      finished: false,
      winner: false
    };
    this.handleState(startAgain);
  };

  GameContainer.prototype.checkWin = function checkWin() {
    var _state = this.state;
    var human = _state.human;
    var computer = _state.computer;
    var winning = _state.winning;
    var finished = _state.finished;
    var winner = _state.winner;

    var man = false;
    var machine = false;

    function checkCombo(player, combo) {
      var result = combo.map(function (bingo) {
        return player.reduce(function (prev, curr) {
          if (curr === bingo) {
            return prev + 1;
          } else {
            return prev;
          }
        }, 0);
      });
      var total = result.reduce(function (prev, curr) {
        return prev + curr;
      }, 0);
      return total == 3 ? true : false;
    }

    //    check if a player has one
    winning.some(function (combo) {

      //    check players moves against winning combo sets
      man = checkCombo(human, combo);
      machine = checkCombo(computer, combo);

      // give the winner their dues
      man ? winner = "Man triumphs" : "";
      machine ? winner = "The Machines have Won" : "";

      // show final
      man || machine ? finished = true : "";

      return man || machine;
    });

    //     check for a draw
    if (human.concat(computer).length === 9) {
      finished = true;
      winner = "A Draw";
    }

    this.handleState({
      winner: winner,
      finished: finished
    });
  };

  GameContainer.prototype.handleState = function handleState(val) {
    this.setState(val);
  };

  GameContainer.prototype.choice = function choice(e) {
    var intro = this.state.intro;

    var val = e.target.value;
    console.log(val);
    var nstate = {
      intro: !intro,
      piece: val
    };
    this.handleState(nstate);
  };

  GameContainer.prototype.doubleCheck = function doubleCheck(number) {
    var _state2 = this.state;
    var human = _state2.human;
    var computer = _state2.computer;

    var present = false;
    //     check for doulbe up
    human.forEach(function (move) {
      if (move === number) {
        present = true;
      }
    });
    computer.forEach(function (move) {
      move === number ? present = true : "";
    });
    !present ? this.move(number) : "";
  };

  GameContainer.prototype.move = function move(number) {
    var human = this.state.human;

    human.push(number);
    this.handleState({
      human: human
    });
    this.turntaking();
  };

  GameContainer.prototype.turntaking = function turntaking() {
    var _state3 = this.state;
    var turn = _state3.turn;
    var human = _state3.human;
    var computer = _state3.computer;

    this.checkWin();
    //     if the
    human.concat(computer).length < 8 ? this.ai() : "";
  };

  GameContainer.prototype.ai = function ai() {
    console.log("machine moves");
    //     goal is to create a number choice engine,
    //     will look at the current, human / machine arrays.
    //     make block then win moves
    var _state4 = this.state;
    var human = _state4.human;
    var computer = _state4.computer;
    var winning = _state4.winning;

    // utility loops

    function checkBlock(player, combo) {
      var result = combo.filter(function (move) {
        var test = true;
        player.forEach(function (made) {
          made === move ? test = false : true;
        });
        return test;
      });
      return result;
    }

    function presence(array, combo, test) {
      array.forEach(function (play) {

        combo.forEach(function (number) {
          number === play ? test = play : "";
        });
      });
      return test;
    }

    //     remove all winning combos that include have human move array.
    var possible = [];
    var blocks = [];
    var block = false;
    var win = false;

    winning.map(function (combo) {

      //    check
      var present = false;
      var robot = false;

      //    human one move win positions
      present = presence(human, combo, present);

      //    robot one move win positions
      robot = presence(computer, combo, robot);

      var potentialBlock = checkBlock(human, combo);
      var potentialWin = checkBlock(computer, combo);

      potentialBlock.length === 1 && potentialBlock[0] !== robot ? block = potentialBlock : "";

      console.log(present, robot);

      potentialWin.length === 1 && potentialWin[0] !== present ? win = potentialWin : "";
    });

    //     determine the play options
    //     block, win, no win, first move
    //     create full model of plays made

    var marked = human.concat(computer);
    var full = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    var free = full.filter(function (move) {
      var test = true;
      marked.forEach(function (made) {
        made === move ? test = false : true;
      });
      return test;
    });

    //     make a move
    var move = false;

    //     block
    //     check human moves against combos. if they have 2 / 3 then
    //     add mark in third spot
    var canblock = false;

    free.forEach(function (item) {
      if (item === block[0]) {
        canblock = true;
      }
    });

    canblock ? move = block[0] : "";

    //     if no machine moves
    //     and middle spot free - go for middle combo
    var middle = false;
    var first = false;
    free.forEach(function (item) {
      if (item == 4) {
        middle = true;
      }
      if (item == 0) {
        first = true;
      }
    });
    computer.length === 0 && middle ? move = 4 : computer.length === 0 && first ? move = 0 : !win && !block ? move = free[0] : "";

    //  if computer could win, then win

    win ? move = win[0] : "";

    console.log("win", win);
    console.log("block", block);
    //     win    

    console.log(computer);
    computer.push(move);
    console.log(computer);
    move ? this.setState({ computer: computer }) : "";

    this.checkWin();
  };

  GameContainer.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "main" },
      React.createElement(Game, {
        state: this.state,
        handleChoice: this.choice.bind(this),
        handleMove: this.move.bind(this),
        handleCheck: this.doubleCheck.bind(this),
        handleReset: this.reset.bind(this)
      })
    );
  };

  return GameContainer;
}(React.Component);

ReactDOM.render(React.createElement(GameContainer, null), document.getElementById('app'));