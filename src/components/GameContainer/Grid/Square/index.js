import React, { Component } from "react";

class Square extends Component {
  constructor(props) {
    super(props);
    console.log(props.show === "true");
    this.state = {
      timeup: false,
      clicked: false
    };
    //  if(props.show==="true")
    //  {
    //      setTimeout(
    //     () => {
    //         console.log("timeout-");
    //         this.setState(
    //             {
    //                 timeUp:false,
    //                 clicked:false
    //             }
    //         );
    //     }
    //     ,
    //     props.size*1000
    // );
    this.setTimeUp();
    // }
  }

  getSqrClass = () => {
    console.log("running sqrclass");
    console.log("timeup : ", this.state.timeup);
    if (!this.state.timeup && this.props.show) {
      console.log("yep");
      return "clicked-square";
    } else if (this.state.timeup && this.state.clicked) {
      console.log("yeee");
      return this.props.show == "true"
        ? " clicked-square "
        : " wrong-square-after";
    } else {
      return "";
    }
  };

  setTimeUp = () => {
    setTimeout(() => {
      console.log("timeup");
      this.setState({
        timeup: true
      });
    }, this.props.size * 1000);
  };

  componentWillReceiveProps(nextProps) {
    // if(nextProps.show!==this.props.show){
    //   //Perform some operation
    //   this.setState({clickClass: nextProps.show==="true" ? "clicked-square":"",clicked:false });
    // }
    if (nextProps.show === "true") {
      //      setTimeout(
      //     () => {
      //         console.log("timeout");
      //         if(!this.state.clicked)
      //         {this.setState(
      //             {
      //                 clickClass:""
      //             }
      //         );}
      //     }
      //     ,
      //     nextProps.size*1000
      // );
      this.setTimeUp();
    }
  }

  handleClick = () => {
    if (this.state.timeup) {
      console.log("clicked on it");
      this.props.updateclick(this.props.number);
      this.setState({
        clicked: true
      });
    }

    // if(this.props.show==="true"){
    //     this.setState(
    //         {
    //             clickClass:"clicked-square",
    //             clicked:true
    //         }
    //     )
    // } else {
    //     this.setState(
    //         {
    //             clickClass:"wrong-square-after",
    //             clicked:true
    //         }
    //     )
    // }
  };

  render() {
    let sQ = this.props.theme.squareTheme;
    //console.log(this.props.show);
    return (
      <div className="square-container" onClick={this.handleClick} style={sQ}>
        <div
          className={
            (this.props.show == "true"
              ? "click-square "
              : "wrong-square-before ") + this.getSqrClass()
          }
        />
      </div>
    );
  }
}

export default Square;
