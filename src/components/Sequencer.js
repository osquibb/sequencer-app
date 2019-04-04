import React, { Component, Fragment } from 'react';
import { Container, Table, Row, Button } from 'reactstrap';
import Tone from 'tone';

function SequencerRow({activeStep, stepsWithSounds, addSound, track, steps, isHeader=false}) {
  const sequencerRow = [];
  let step = 0
  if(isHeader) {
    sequencerRow.push(<th key='header-none'></th>);
    while(step < steps) {
      sequencerRow.push(<th key={'header-' + step+1}
                            className={step === activeStep ? 'table-info text-white' : null}>{step+1}</th>);
      step++;
    }
    return (
      <tr className="text-center">
      {sequencerRow}
      </tr>
    );
  } else {
    while(step < steps) {
      sequencerRow.push(<td key={track+'-'+step}
                            onClick={addSound}
                            id={track+'-'+step}
                            style={{'cursor': 'pointer'}}
                            className={stepsWithSounds[step] !== null ? 'table-warning' : null}></td>);
      step++;
    }
    return(
      <tr>
        <th scope="row" className="text-center">Track {track}</th>
        {sequencerRow}
      </tr>
    );
  }
}

function SequencerTrackRows(props) {
  const sequencerTrackRows = [];
  let track = 1;
  while(track <= props.tracks) {
    sequencerTrackRows
    .push(<SequencerRow key={track}
                        activeStep={props.activeStep}
                        stepsWithSounds={props.stepsWithSounds[track-1]}
                        addSound={props.addSound}
                        track={track}
                        steps={props.steps}/>)
    track++
  }
  return sequencerTrackRows;
}

class Sequencer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      stepsWithSounds: new Array(parseInt(props.tracks))
                       .fill(new Array(parseInt(props.steps))
                       .fill(null))
    };
    this.stopSequencer = this.stopSequencer.bind(this);
    this.resetSequencer = this.resetSequencer.bind(this);
    this.addSound = this.addSound.bind(this);
  }

  componentDidUpdate(){

    let synth = new Tone.Synth().toMaster();

    for(let track in this.state.stepsWithSounds) {
      if(this.state.stepsWithSounds[track][this.state.activeStep] !== null){
        synth.triggerAttackRelease("C4", "16n");
      }
    }

  }

  playSequencer(bpm) {
    const ms = 60000 / bpm;
    this.activeStepID = setInterval(
      () => this.setState(state =>
            ({activeStep: (state.activeStep + 1)
            % this.props.steps})),
      ms
    );
  }

stopSequencer() {
  clearInterval(this.activeStepID);
}

resetSequencer() {
  clearInterval(this.activeStepID);
  this.setState({activeStep: 0});
}

addSound(event) {
const track = parseInt(event.target.id.split('-')[0]);
const step = parseInt(event.target.id.split('-')[1]);
const updatedStepsWithSounds = this.state.stepsWithSounds
                             .map(track => [...track]);
if(updatedStepsWithSounds[track-1][step] === null) {
  updatedStepsWithSounds[track-1][step] = 'x';
} else {
  updatedStepsWithSounds[track-1][step] = null;
}
this.setState({stepsWithSounds: updatedStepsWithSounds});
}

componentWillUnmount() {
  clearInterval(this.activeStepID);
}

  render() {
    return(
      <Fragment>
        <h3 className="text-center">Sequencer</h3>
        <Table bordered className="mt-2 text-muted">
          <thead>
            <SequencerRow activeStep={this.state.activeStep}
                          steps={this.props.steps}
                          isHeader={true}/>
          </thead>
          <tbody>
            <SequencerTrackRows activeStep={this.state.activeStep}
                                stepsWithSounds={this.state.stepsWithSounds}
                                addSound={this.addSound}
                                tracks={this.props.tracks}
                                steps={this.props.steps} />
          </tbody>
        </Table>
        <div className="text-center">
          <Button color="warning" className="mr-3" onClick={this.resetSequencer}>Reset</Button>
          <Button color="danger" className="ml-3 mr-3" onClick={this.stopSequencer}>Stop</Button>
          <Button color="success" className="ml-3" onClick={() => this.playSequencer(this.props.bpm)}>Play</Button>
        </div>
      </Fragment>
    );
  }
}

export default Sequencer;
