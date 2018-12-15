import * as React from "react";
import { Layer, Rect, Stage } from "react-konva";
import "./App.css";
import { Point } from "./inputData";
import { applyVelocity } from "./pointLogic";

type Props = {
  initialPoints: ReadonlyArray<Point>;
};

type State = {
  currentIteration: number;
  step: number;
  zoom: number;
  currentPoints: ReadonlyArray<Point>;
};

class App extends React.Component<Props, State> {
  public state: Readonly<State> = {
    currentIteration: 0,
    step: 1,
    zoom: 1,
    currentPoints: this.props.initialPoints,
  };

  public render() {
    const { zoom } = this.state;
    return (
      <div className="App">
        <span>Current iteration: {this.state.currentIteration}</span>
        <div>
          <button onClick={this.handlePrevClick}>Prev</button>
          <input
            type="text"
            value={this.state.step}
            onChange={this.handleStepChange}
          />
          <button onClick={this.handleNextClick}>Next</button>
        </div>
        <span>Zoom level: {this.state.zoom}</span>
        <div>
          <button onClick={this.handleDecreaseZoomClick}>-</button>
          <span>{this.state.zoom}</span>
          <button onClick={this.handleIncreaseZoomClick}>+</button>
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {this.state.currentPoints.map((p) => (
              <Rect
                x={p.x * zoom}
                y={p.y * zoom}
                width={zoom}
                height={zoom}
                fill="green"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }

  private handleStepChange = (e: any) =>
    this.setState({ step: Number(e.target.value) })

  private handleIncreaseZoomClick = () =>
    this.setState((prevState) => ({ zoom: prevState.zoom + 1 }))

  private handleDecreaseZoomClick = () =>
    this.setState((prevState) => ({ zoom: prevState.zoom - 1 }))

  private handlePrevClick = () => this.updatePoints(-this.state.step);
  private handleNextClick = () => this.updatePoints(this.state.step);

  private updatePoints = (step: number) => {
    this.setState((prevState) => ({
      currentPoints: prevState.currentPoints.map((p) => applyVelocity(p, step)),
      currentIteration: prevState.currentIteration + step,
    }));
  }
}

export default App;
