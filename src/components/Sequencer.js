import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col, Input } from 'reactstrap';
import SoundSelector from './SoundSelector';
import { Howl } from 'howler';

function SequencerRow({sounds, handleSoundSelect, activeStep, seqRow, addSound, row, steps, isHeader=false}) {
  // function that builds and returns one sequencer row
  
  // initialize empty row array
  const sequencerRow = [];

  let step = 0

  // if header...
  if(isHeader) {
    // first row of header blank with key 'header-none'
    sequencerRow.push(<th key='header-none'></th>);

    // after first row of header, each th displays step num 
    // blue w/ white text if step num is the active step
    while(step < steps) {
      sequencerRow.push(<th key={'header-' + step+1}
                            className={step === activeStep ? 'table-info text-white' : null}>{step+1}</th>);
      step++;
    }

    // return the entire header row
    return (
      <tr className="text-center">
      {sequencerRow}
      </tr>
    );

    // if not the header row...
  } else {
    while(step < steps) {

      // each td blank.  change color if the associated sequencer array 
      // row step is not null (only the associated 2D row of the sequencer
      // array is passed in)
      // addSound(): each cell adds (or removes) an 'x' to the sequencerArray when clicked.
      // which, in turn, results in a change of the cell color
      sequencerRow.push(<td key={row+'-'+step}
                            onClick={addSound}
                            id={row+'-'+step}
                            style={{'cursor': 'pointer'}}
                            className={seqRow[step] !== null ? 'table-warning' : null}></td>);
      step++;
    }

    // return row with Track n as the first cell (th), followed
    // by the sequencer row
    return(
      <tr>
        <th scope="row" className="text-center">
        Track {row}
        <SoundSelector row={row} sounds={sounds} handleSoundSelect={handleSoundSelect}/>
        </th>
        {sequencerRow}
      </tr>
    );
  }
}

function SequencerTrackRows(props) {
  // function that returns multiple SequencerRows for multiple
  // tracks

  const sequencerTrackRows = [];
  let row = 1
  while(row <= props.rows) {
    sequencerTrackRows
    .push(<SequencerRow key={row}
                        sounds={props.sounds}
                        handleSoundSelect={props.handleSoundSelect}
                        activeStep={props.activeStep}
                        seqRow={props.sequencer[row-1].rowSeq}
                        addSound={props.addSound}
                        row={row}
                        steps={props.steps}/>)
    row++
  }
  return sequencerTrackRows;
}

export default class Sequencer extends Component {

  constructor(props) {
    const rows = 2; // initial num of tracks
    const steps = 8; // inital num of steps

    super(props);
    this.state = {
      isDefaultState: true,
      bpm: 120,
      activeStep: 0,
      sequencer: new Array(rows).fill({ rowSeq: new Array(steps).fill(null),
                                          rowSoundEngine: new Howl({src: [this.props.soundUrls[0]]})
                                        })
    };

    this.stopSequencer = this.stopSequencer.bind(this);
    this.clearSequencer = this.clearSequencer.bind(this);
    this.addSound = this.addSound.bind(this);
    this.handleSoundSelect = this.handleSoundSelect.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);

    this.soundEngines = this.props.soundUrls.map(soundUrl => {
      return(
        new Howl({src: [soundUrl]})
      );
    });
  };

  addTrack() {
    const seq = this.state.sequencer.map(row => ({...row}));
    seq.push(
              {
                rowSeq: new Array(seq[0].rowSeq.length).fill(null),
                rowSoundEngine: null
              }
    );

    if(seq.length >= 9) {
      alert('Maximum Number of Tracks: 8')
    } else {
    this.setState({sequencer: seq});
    }
  }
  
  addStep() {
    const seq = this.state.sequencer.map(row => ({...row}));

    for(let row in seq) {
      seq[row].rowSeq = [...seq[row].rowSeq, null];
    }

    if(seq[0].rowSeq.length >= 17) {
      alert('Maximum Number of Steps: 16')
    } else {
    this.setState({sequencer: seq});
    }
  }

  handleSoundSelect(rowIdx, soundIdx) {
    const seq = this.state.sequencer.map(row => ({...row}));
    seq[rowIdx].rowSoundEngine = this.soundEngines[soundIdx];
    this.setState({sequencer: seq});
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.activeStep !== this.state.activeStep){
      for(let row in this.state.sequencer){
        if(this.state.sequencer[row].rowSeq[this.state.activeStep] !== null){
          if(this.state.sequencer[row].rowSoundEngine !== null){
            this.state.sequencer[row].rowSoundEngine.play();
          }
        }
      }
    }
  }

  playSequencer(bpm) {
    this.setState({isDefaultState: false});
    const steps = this.state.sequencer[0].rowSeq.length;
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

clearSequencer() {
  this.setState({isDefaultState: true});
  clearInterval(this.activeStepID);
  this.setState({activeStep: 0});
  const clearSeq = new Array(this.state.sequencer.length)
                    .fill({
                            rowSeq: new Array(this.state.sequencer[0].rowSeq.length).fill(null),
                            rowSoundEngine: null
                          }
                  );
  this.setState({sequencer: clearSeq});
}

addSound(event) {
const [row, step] = event.target.id.split('-');
const updatedRowSeq = this.state.sequencer[row-1].rowSeq.slice();
updatedRowSeq[step] = (updatedRowSeq[step] === null) ? 'x' : null;

const seq = this.state.sequencer.map(row => ({...row}));
seq[row-1].rowSeq = updatedRowSeq;

this.setState({sequencer: seq});
}

componentWillUnmount() {
  clearInterval(this.activeStepID);
}

handleBPMChange(event) {
  this.setState({bpm: event.target.value});
}

  render() {
    const steps = this.state.sequencer[0].rowSeq.length;
    const rows = this.state.sequencer.length;

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
                                    sounds={this.props.sounds}
                                    handleSoundSelect={this.handleSoundSelect}
                                    sequencer={this.state.sequencer}
                                    addSound={this.addSound}
                                    rows={rows}
                                    steps={steps} />
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button color="warning" className="mr-3" onClick={this.clearSequencer}>Clear</Button>
            <Button color="danger" className="ml-3 mr-3" onClick={this.stopSequencer}>Stop</Button>
            <Button color="success" className="ml-3" onClick={() => this.playSequencer(this.state.bpm)}>Play</Button>
          </Col>
        </Row>
        <Row className="text-center text-muted">
          <Col>
            <Button className={!this.state.isDefaultState ? 'd-none m-3' : 'm-3'} onClick={() => this.addTrack()}><i className="fa fa-plus-circle"></i> Tracks</Button>
            <Button className={!this.state.isDefaultState ? 'd-none m-3' : 'm-3'} onClick={() => this.addStep()}><i className="fa fa-plus-circle"></i> Steps</Button>
          </Col>
        </Row>
        <Row className={!this.state.isDefaultState ? 'd-none' : 'text-muted text-center'}>
          <Col xs="2">
            <h4>BPM</h4>
          </Col>
          <Col xs="8">
            <Input type='range' min={60} max={600} value={this.state.bpm} onChange={this.handleBPMChange}/>
          </Col>
          <Col xs="2">
            <h4>{this.state.bpm}</h4>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

