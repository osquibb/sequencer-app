import React, { Component, Fragment } from 'react';
import Sequencer from './Sequencer';
import { Row, Col } from 'reactstrap';

class CustomSequencer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tracks: 2,
      steps: 8,
      bpm: 120
    };
    
    this.addStep = this.addStep.bind(this);
    this.addTrack = this.addTrack.bind(this);
  }

  addStep() {
    this.setState({steps: this.state.steps + 1});
  }

  addTrack() {
    this.setState({tracks: this.state.tracks + 1});
  }

  render() {
    return(
      <Fragment>
        <Sequencer tracks={this.state.tracks} steps={this.state.steps} bpm={this.state.bpm} />
          <Row>
            <a className="text-secondary"
               onClick={this.addStep}><i className="fa fa-plus-circle"></i> steps</a>
          </Row>
          <Row>
            <a className="text-secondary mt-3"
               onClick={this.addTrack}><i className="fa fa-plus-circle"></i> tracks</a>
          </Row>
      </Fragment>
    )
  }

}

export default CustomSequencer;


