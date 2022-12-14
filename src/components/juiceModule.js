import React from 'react';

export class JuiceModule extends React.Component {
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