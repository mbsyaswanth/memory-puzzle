import React, { Component } from "react";

import "./styles.css";

import Grid from "./Grid";

const liteTheme = {
  color: "black",
  backgroundColor: "white",
  squareTheme: {
    backgroundColor: "rgb(128,112,250,0.45)"
  }
};

const darkTheme = {
  color: "white",
  backgroundColor: "rgb(34, 40, 112)",
  squareTheme: {
    backgroundColor: "rgb(128,112,250,0.45)"
  }
};

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thememode: darkTheme,
      randomNumbers: this.getRandomNumbers(0),
      level: 0
    };
  }

  handleTheme = () => {
    console.log("onclick working");
    if (this.state.thememode === darkTheme) {
      this.setState({
        thememode: liteTheme
      });
    } else {
      this.setState({
        thememode: darkTheme
      });
    }
  };

  checkClickedSquares = clicks => {
    console.log(clicks.sort());
    console.log(this.state.randomNumbers.sort());
    console.log(
      clicks.sort().toString() === this.state.randomNumbers.sort().toString()
    );
    if (
      clicks.sort().toString() === this.state.randomNumbers.sort().toString()
    ) {
      if (this.state.level == 2) {
        alert(
          "congratulations! sucessfully completed the game. You can start again from initial level"
        );
        setTimeout(this.goToInitialLevel, 1000);
      } else {
        setTimeout(this.increaseLevel, 1000);
      }
    } else {
      setTimeout(this.goToInitialLevel, 1000);
    }
  };

  updateRandomNums = () => {
    console.log("setting randoms");
    this.setState({
      randomNumbers: this.getRandomNumbers(this.state.level)
    });
  };

  getRandomNumbers = level => {
    console.log("level:", level);
    let random = [];
    console.log("random:", random);
    while (random.length !== level + 3) {
      let number = Math.floor(
        Math.random() * Math.floor((level + 3) * (level + 3))
      );
      if (!random.includes(number)) {
        random.push(number);
      }
    }
    console.log("random:", random);
    return random;
  };

  goToInitialLevel = () => {
    this.setState(
      {
        level: 0
      },
      this.updateRandomNums
    );
  };

  increaseLevel = () => {
    this.setState(
      {
        level: this.state.level + 1
      },
      this.updateRandomNums
    );
  };

  render() {
    let themeMode = {
      color: this.state.thememode.color,
      backgroundColor: this.state.thememode.backgroundColor
    };
    return (
      <div className="game-container" style={themeMode}>
        <div className="game-info">
          <div className="center">Level: {" " + this.state.level}</div>
          <div className="center">
            Theme mode:
            <label className="switch">
              <input type="checkbox" onClick={this.handleTheme} />
              <span className="slider round" />
            </label>
          </div>
        </div>

        <Grid
          key={this.state.level}
          gridsize={this.state.level + 3}
          checkclicks={this.checkClickedSquares}
          randoms={this.state.randomNumbers}
          theme={this.state.thememode}
        />
      </div>
    );
  }
}

export default GameContainer;
