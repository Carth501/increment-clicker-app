import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class AutoGenerators extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoGens: {
                count: 0,
                cost: this.calculateNextAutoGenCost(0),
            }
        }
        setInterval(() => {this.props.onInterval(this.state.autoGens.count / 10)}, 100);
    }

    render() {
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
        const success = this.props.onBuy(this.state.autoGens.cost);
        if(success) {
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            byteDimes: 0,
        }
    }

    createByteDimes(i) {
        let byteDimes = this.state.byteDimes;
        byteDimes += i;
        this.setState({byteDimes});
    }

    costByteDimes(i) {
        if(i > this.state.byteDimes){
            return false;
        }
        this.setState({byteDimes: this.state.byteDimes - i});
        return true;
    }

    render() {
        return (
            <div className="game">
                <div className="ByteDimes: ">
                    ByteDimes: {this.state.byteDimes.toFixed()}
                </div>
                {this.renderFirstOrderGenerate()}
                <div className="container">
                    <AutoGenerators 
                        onInterval={(i) => this.createByteDimes(i)}
                        onBuy={(i) => this.costByteDimes(i)}/>
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
}
  
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);