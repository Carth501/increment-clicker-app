import React from 'react';
import { AutoGenerators } from './autoGenerators';
import { UpgradePanel } from './upgradePanel';

export class Game extends React.Component {
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