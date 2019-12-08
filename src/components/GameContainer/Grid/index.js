import React, { Component } from "react";

import Square from "./Square";

class Grid extends Component {
  constructor(props) {
    super(props);
    // console.log(props.show==="true");
    this.state = {
      clickedSquares: [],
      gridFade: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ gridFade: "" });
  }

  rightClicks = () => {
    console.log("hello");
    console.log(this.state.clickedSquares.length == this.props.gridsize);
    if (this.state.clickedSquares.length == this.props.gridsize) {
      this.updateParentClicks();
      this.setState({
        clickedSquares: [],
        gridFade: "grid-zoom-in"
      });
    }
  };

  wrongClick = () => {
    this.updateParentClicks();
  };

  updateClickedSquares = squarenumber => {
    if (this.props.randoms.includes(squarenumber)) {
      if (!this.state.clickedSquares.includes(squarenumber)) {
        this.setState(
          {
            clickedSquares: this.state.clickedSquares.concat(squarenumber)
          },
          this.rightClicks
        );
      }
    } else {
      this.setState(
        {
          clickedSquares: this.state.clickedSquares.concat(squarenumber),
          gridFade: "grid-zoom-in"
        },
        this.wrongClick
      );
    }
  };

  generateSquares = () => {
    let squares = [];
    let size = this.props.gridsize * this.props.gridsize;
    for (let i = 0; i < size; i++) {
      if (this.props.randoms.includes(i)) {
        squares.push(
          <Square
            updateclick={this.updateClickedSquares}
            size={this.props.gridsize}
            show="true"
            number={i}
            theme={this.props.theme}
          />
        );
      } else {
        squares.push(
          <Square
            updateclick={this.updateClickedSquares}
            size={this.props.gridsize}
            show="false"
            number={i}
            theme={this.props.theme}
          />
        );
      }
    }
    return squares;
  };

  updateParentClicks = () => {
    this.props.checkclicks(this.state.clickedSquares);
  };

  render() {
    let grid = {
      display: "grid",
      gridTemplateColumns: "repeat(" + this.props.gridsize + "," + "auto" + ")",
      gridTemplateRows: "repeat(" + this.props.gridsize + "," + "auto" + ")",
      gridGap: "2px",
      transition: "all .3s linear .4s"
    };

    return (
      <div key={this.props.key} className={"grid-container "}>
        <div className={this.state.gridFade + " grid"} style={grid}>
          {this.generateSquares()}
        </div>
      </div>
    );
  }
}

export default Grid;
