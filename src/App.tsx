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
};

class App extends React.Component<Props, State> {
  public state: Readonly<State> = {
    currentIteration: 10710,
    step: 1,
    zoom: 1,
  };

  public render() {
    const { zoom } = this.state;
    const currentPoints = this.props.initialPoints.map(p =>
      applyVelocity(p, this.state.currentIteration),
    );

    const leftMostX = Math.min(...currentPoints.map(p => p.x));
    const topMostY = Math.min(...currentPoints.map(p => p.y));

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
          <button onClick={this.handleIncreaseZoomClick}>+</button>
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {currentPoints.map(p => (
              <Rect
                x={(p.x - leftMostX) * zoom}
                y={(p.y - topMostY) * zoom}
                width={Math.max(zoom, 1)}
                height={Math.max(zoom, 1)}
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

  private handleIncreaseZoomClick = () => {
    this.setState(prevState => {
      if (prevState.zoom >= 1) {
        return { zoom: prevState.zoom + 1 };
      } else if (prevState.zoom >= 0.5) {
        return { zoom: 1 };
      } else {
        return { zoom: prevState.zoom * 2 };
      }
    });
  }

  private handleDecreaseZoomClick = () => {
    this.setState(prevState => {
      if (prevState.zoom >= 2) {
        return { zoom: prevState.zoom - 1 };
      } else {
        return { zoom: prevState.zoom / 2 };
      }
    });
  }

  private handlePrevClick = () =>
    this.setState({
      currentIteration: this.state.currentIteration - this.state.step,
    })

  private handleNextClick = () =>
    this.setState({
      currentIteration: this.state.currentIteration + this.state.step,
    })
}

export default App;
