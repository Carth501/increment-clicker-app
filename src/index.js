import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class UpgradePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div>
                <button onClick={() => {this.props.onBuy()}}>Autobuy Juice</button>
                <button onClick={() => {this.props.onBuy()}}>Improve Juice package size</button>
                <button onClick={() => {this.props.onBuy()}}>Lower Juice cost</button>
                <button onClick={() => {this.props.onBuy()}}>Improve AutoGenerator productivity by 0.1</button>
                <button onClick={() => {this.props.onBuy()}}>Improve AutoGenerator efficiency by 0.1</button>
            </div>;
    }
}

class JuiceModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div>
            <div>
                Juice: {this.props.juice.toFixed()}
                <button onClick={() => {this.props.onBuy()}}>buy 30 seconds of Juice</button>
            </div>
            </div>;
    }
}

class AutoGenerators extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            cost: this.calculateNextAutoGenCost(0),
            juice: 4096,
            showJuice: false,
        }
        setInterval(() => {
            this.autoGenerationCycle();
        }, 10);
    }

    render() {
        let juiceModule = null;
        if(this.state.showJuice){
            juiceModule = <JuiceModule 
                juice={this.state.juice}
                onBuy={(i) => this.buyJuice(i)}
            />;
        }
        return (<div>
            <div>autoGen count: {this.state.count}</div>
            <div>autoGen cost: {this.state.cost}</div>
            <button 
            className="second-order-increment"
            onClick={() => {this.puchaseAutoGen()}}
            >
                Purchase AutoGen
            </button>
            {juiceModule}
        </div>);
    }

    puchaseAutoGen(){
        const state = this.state;
        const success = this.props.onBuy(this.state.cost);
        if(success) {
            state.count += 1;
        }
        state.cost = this.calculateNextAutoGenCost(state.count);
        this.setState(state);
    }

    calculateNextAutoGenCost(count) {
        return Math.round( Math.pow(((count + 1) * 4 ), 1.2));
    }

    autoGenerationCycle() {
        const delta = this.state.count / 100;
        if(this.state.juice >= delta){
            this.props.onInterval(delta);
            const juice = this.state.juice - delta;
            let showJuice = this.state.showJuice;
            if(juice < this.state.count * 300){
                showJuice = true;
            }
            this.setState({
                juice,
                showJuice,
            })
        }
    }

    buyJuice(){
        const exponent = Math.pow(0.98, Math.sqrt(this.state.count));
        const juiceCost = Math.pow((this.state.count * 25), exponent);
        const success = this.props.onBuy(juiceCost);
        if(success){
            this.setState({juice: (this.state.juice + (this.state.count * 30))})
        }
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            byteDimes: 0,
            lifetimeBDs: 0,
            showAutoGens: false,
            showUpgradePanel: false,
        }
    }

    createByteDimes(i) {
        let byteDimes = this.state.byteDimes;
        byteDimes += i;
        let lifetimeBDs = this.state.lifetimeBDs;
        lifetimeBDs += i;
        let showAutoGens = this.state.showAutoGens;
        if(byteDimes >= 10){
            showAutoGens = true;
        }
        let showUpgradePanel = this.state.showUpgradePanel;
        if(lifetimeBDs >= Math.pow(2, 10)){
            showUpgradePanel = true;
        }
        this.setState({byteDimes, lifetimeBDs, showAutoGens, showUpgradePanel});
    }

    costByteDimes(i) {
        if(i > this.state.byteDimes){
            return false;
        }
        this.setState({byteDimes: this.state.byteDimes - i});
        return true;
    }

    render() {
        let autoGens = null;
        if(this.state.showAutoGens){
            autoGens = <div className="container">
                    <AutoGenerators 
                        onInterval={(i) => this.createByteDimes(i)}
                        onBuy={(i) => this.costByteDimes(i)}/>
                </div>;
        }
        let upgradePanel = null;
        if(this.state.showUpgradePanel){
            upgradePanel = <div className="container">
                <UpgradePanel/>;
            </div>
        }
        return (
            <div className="game">
                <div className="ByteDimes: ">
                    ByteDimes: {this.state.byteDimes.toFixed()}
                </div>
                {this.renderFirstOrderGenerate()}
                {autoGens}
                {upgradePanel}
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