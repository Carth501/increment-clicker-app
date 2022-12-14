import React from 'react';

export class AutoGenerators extends React.Component {
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
            juiceModule = <juiceModule 
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