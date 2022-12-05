import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            byteDimes: 0,
            autoGens: {
                count: 0,
                cost: this.calculateNextAutoGenCost(0),
            }
        }
        setInterval(() => {this.createByteDimes(this.state.autoGens.count / 10)}, 100);
        
    }

    createByteDimes(i) {
        let byteDimes = this.state.byteDimes;
        byteDimes += i;
        this.setState({byteDimes});
    }

    render() {
        return (
            <div className="game">
                <div className="ByteDimes: ">
                    ByteDimes: {this.state.byteDimes.toFixed()}
                </div>
                {this.renderFirstOrderGenerate()}
                <div className="container">
                    {this.renderSecondOrderGenerators()}
                </div>
            </div>
        );
    }

    renderFirstOrderGenerate() {
        return (
            <button 
            className="first-order-increment"
            onClick={() => {this.createByteDimes(1)}}
            >
                Generate
            </button>
        );
    }

    renderSecondOrderGenerators() {
        return (<div>
            autoGen cost: {this.state.autoGens.cost}
            <button 
            className="second-order-increment"
            onClick={() => {this.puchaseAutoGen()}}
            >
                Purchase AutoGen
            </button>
        </div>);
    }

    puchaseAutoGen(){
        const state = this.state;
        if(state.byteDimes >= state.autoGens.cost) {
            state.byteDimes -= state.autoGens.cost;
            state.autoGens.count += 1;
            console.log(state.autoGens, " @ ", state.cost);
        }
        state.autoGens.cost = this.calculateNextAutoGenCost(state.autoGens.count);
        this.setState(state);
    }

    calculateNextAutoGenCost(count) {
        return Math.round( Math.pow(((count + 1) * 4 ), 1.2));
    }
}
  
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);