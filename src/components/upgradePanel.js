import React from 'react';

export class UpgradePanel extends React.Component {
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