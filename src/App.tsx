import * as React from "react";
import "./App.css";
import { Point } from "./inputData";
import { applyVelocity } from "./pointLogic";

type Props = {
  initialPoints: ReadonlyArray<Point>;
};

type State = {
  currentIteration: number;
  step: number;
  currentPoints: ReadonlyArray<Point>;
};

class App extends React.Component<Props, State> {
  public state: Readonly<State> = {
    currentIteration: 0,
    step: 1,
    currentPoints: this.props.initialPoints,
  };

  public render() {
    return (
      <div className="App">
        <span>Current iteration: {this.state.currentIteration}</span>
        <input
          type="text"
          value={this.state.step}
          onChange={this.handleStepChange}
        />
        <button onClick={this.handleNextClick}>Next</button>
      </div>
    );
  }

  private handleStepChange = (e: any) =>
    this.setState({ step: Number(e.target.value) })

  private handleNextClick = () => {
    this.setState({
      currentIteration: this.state.currentIteration + this.state.step,
      currentPoints: this.state.currentPoints.map((p) =>
        applyVelocity(p, this.state.step),
      ),
    });
  }
}

export default App;
