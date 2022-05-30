import React from 'react';
import Analyze from '../buttons/assessment';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'United States',
            state: "California"
        };
    }
    onChange = (e) => {

    }
    render() {
        return (<div className="home">
            <div className="home-header">
                <div className="home-header-top">
                    <div className="home-header-top-name">
                        {this.state.country}{this.state.state ? `, ${this.state.state}` : null}
                    </div>
                    <div className="home-header-top-input">
                        <div className="home-header-top-input-each">
                            <p>
                                Country
                            </p>
                            <input className="input" name="country" onChange={this.onChange} type="text" placeholder="Country" />
                        </div>

                        <div className="home-header-top-input-each">
                            <p>
                                State/Province
                            </p>
                            <input className="input" name="state" onChange={this.onChange} type="text" placeholder="Country" />
                        </div>
                    </div>
                </div>
                <Analyze />
            </div>
        </div>)
    }
}

export default Home;