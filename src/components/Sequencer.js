import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import Tone from 'tone';

function SequencerRow({activeStep, sequencerArray, addSound, track, steps, isHeader=false}) {
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
                            className={sequencerArray[step] !== null ? 'table-warning' : null}></td>);
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
                        sequencerArray={props.sequencerArray[track-1]}
                        addSound={props.addSound}
                        track={track}
                        steps={props.steps}/>)
    track++
  }
  return sequencerTrackRows;
}

class Sequencer extends Component {

  constructor(props) {
    const tracks = 2; // initial num of tracks
    const steps = 8; // inital num of steps

    super(props);
    this.state = {
      isDefaultState: true,
      bpm: 120,
      activeStep: 0,
      sequencerArray: new Array(tracks)
                       .fill(new Array(steps)
                       .fill(null))
    };
    
    this.stopSequencer = this.stopSequencer.bind(this);
    this.resetSequencer = this.resetSequencer.bind(this);
    this.addSound = this.addSound.bind(this);
  }

  addTrack() {
    this.setState(state => (
      { sequencerArray: [...state.sequencerArray, 
                         new Array(state.sequencerArray[0].length).fill(null)]
      }));
  }

  addStep() {
    const seq = this.state.sequencerArray;
    for(let track in seq) {
      seq[track] = [...seq[track], null]
    }
    this.setState({sequencerArray: seq});
  }

  componentDidUpdate(){

    let synth = new Tone.Synth().toMaster();

    for(let track in this.state.sequencerArray) {
      if(this.state.sequencerArray[track][this.state.activeStep] !== null){
        const note = 'C' + (parseInt(track) + 4)
        synth.triggerAttackRelease(note, "16n");
      }
    }
  }

  playSequencer(bpm) {
    this.setState({isDefaultState: false});
    const steps = this.state.sequencerArray[0].length;
    const ms = 60000 / bpm;
    this.activeStepID = setInterval(
      () => this.setState(state =>
            ({activeStep: (state.activeStep + 1)
            % steps})),
      ms
    );
  }

stopSequencer() {
  clearInterval(this.activeStepID);
}

resetSequencer() {
  this.setState({isDefaultState: true});
  clearInterval(this.activeStepID);
  this.setState({activeStep: 0});
  this.setState({sequencerArray: new Array(2)
                                .fill(new Array(8)
                                .fill(null)) });
}

addSound(event) {
const track = parseInt(event.target.id.split('-')[0]);
const step = parseInt(event.target.id.split('-')[1]);
const updatedsequencerArray = this.state.sequencerArray
                             .map(track => [...track]);
if(updatedsequencerArray[track-1][step] === null) {
  updatedsequencerArray[track-1][step] = 'x';
} else {
  updatedsequencerArray[track-1][step] = null;
}
this.setState({sequencerArray: updatedsequencerArray});
}

componentWillUnmount() {
  clearInterval(this.activeStepID);
}

  render() {
    const steps = this.state.sequencerArray[0].length;
    const tracks = this.state.sequencerArray.length;

    return(
      <Fragment>
        <Row className="text-center">
          <Col>
            <h3>Sequencer</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered className="text-muted">
              <thead>
                <SequencerRow activeStep={this.state.activeStep}
                              steps={steps}
                              isHeader={true}/>
              </thead>
              <tbody>
                <SequencerTrackRows activeStep={this.state.activeStep}
                                    sequencerArray={this.state.sequencerArray}
                                    addSound={this.addSound}
                                    tracks={tracks}
                                    steps={steps} />
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button color="warning" className="mr-3" onClick={this.resetSequencer}>Reset</Button>
            <Button color="danger" className="ml-3 mr-3" onClick={this.stopSequencer}>Stop</Button>
            <Button color="success" className="ml-3" onClick={() => this.playSequencer(this.state.bpm)}>Play</Button>
          </Col>
        </Row>
        <Row className="text-center text-muted">
          <Col>
            <Button className='m-3' disabled={!this.state.isDefaultState} onClick={() => this.addTrack()}><i className="fa fa-plus-circle"></i> Tracks</Button>
            <Button className='m-3' disabled={!this.state.isDefaultState} onClick={() => this.addStep()}><i className="fa fa-plus-circle"></i> Steps</Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Sequencer;
