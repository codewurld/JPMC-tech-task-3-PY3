import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data} />)
    }
  }

  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Stocks Correlation Dashboard <br />
          JPMorgan Chase
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button" onClick={() => { this.getDataFromServer() }}>Start Streaming Data</button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
          <div>
            <p>This graph monitors and displays two historically correlated stocks for the purpose of notifiying traders when to buy underperforming stock and when to sell outperforming stock. </p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;