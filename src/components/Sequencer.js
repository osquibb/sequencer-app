import React, { Component, Fragment } from 'react';
import { Table, Row, Col } from 'reactstrap';
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
    sequencerRow.push(<th style={{border: '1px solid #1A163D', 
                                  backgroundColor: "white"}} 
                          key='header-none' 
                      />);

    // after first row of header, each th displays step num 
    while(step < steps) {
      sequencerRow.push(<th style={{border: '1px solid #1A163D', 
                                    backgroundColor : step === activeStep ? '#FFFBC7' : 'white'}} 
                            key={'header-' + step+1}
                        >
                          {step+1}
                        </th>);
      step++;
    }

    // return the entire header row
    return (
      <tr>
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
                            style={{cursor: 'pointer',
                                    border: '1px solid #1A163D', 
                                    backgroundColor: seqRow[step] !== null ? '#E07D7E' : 'white'
                                  }}
                        />);
      step++;
    }

    // return row with Track n as the first cell (th), followed
    // by the sequencer row
    return(
      <tr>
        <th style={{border: '1px solid #1A163D', 
                    backgroundColor: "white"}} 
            scope="row" 
        >
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
    const steps = 6; // inital num of steps

    super(props);
    this.state = {
      isDefaultState: true,
      isPlaying: false,
      bpm: 240,
      activeStep: 0,
      sequencer: new Array(rows).fill({ rowSeq: new Array(steps).fill(null),
                                          rowSoundEngine: new Howl({src: [this.props.soundUrls[0]]})
                                        })
    };

    this.stopSequencer = this.stopSequencer.bind(this);
    this.clearSequencer = this.clearSequencer.bind(this);
    this.resetSequencer = this.resetSequencer.bind(this);
    this.addSound = this.addSound.bind(this);
    this.handleSoundSelect = this.handleSoundSelect.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);

    this.rows = rows;
    this.steps = steps;

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
    this.setState({isPlaying: true});
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
  this.setState({isPlaying: false});
  clearInterval(this.activeStepID);
}

clearSequencer() {
  this.setState({isDefaultState: true});
  this.setState({isPlaying: false});
  clearInterval(this.activeStepID);
  this.setState({activeStep: 0});

  const seq = this.state.sequencer.map(row => ({...row}));

  for(let row in seq){
    seq[row].rowSeq = seq[row].rowSeq.fill(null);
  }

  this.setState({sequencer: seq});
}

resetSequencer() {
  this.setState({isDefaultState: true});
  this.setState({isPlaying: false});
  clearInterval(this.activeStepID);
  this.setState({activeStep: 0});
  const resetSeq = new Array(this.rows).fill({ 
                                          rowSeq: new Array(this.steps).fill(null),
                                          rowSoundEngine: new Howl({
                                                                    src: [this.props.soundUrls[0]]
                                                                  })
  })
  this.setState({sequencer: resetSeq});
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
        <Row>
          <Col>
            <Table  
                   className='mt-3 mb-5'
                   style={{boxShadow: '4px 4px #1A163D'}}
            >
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
        <Row className='mb-3'>
          <Col>
            <button className="mr-3 sequencer-button" onClick={this.resetSequencer}>Reset</button>
            <button className="ml-3 mr-3 sequencer-button" onClick={this.clearSequencer}>Clear</button>
            <button className="ml-3 mr-3 sequencer-button text-danger" onClick={this.stopSequencer}>Stop</button>
            <button className="ml-3 sequencer-button text-success" onClick={() => this.playSequencer(this.state.bpm)}>Play</button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <button className='m-3 sequencer-button' onClick={() => this.addTrack()}><i className="fa fa-plus-circle"></i> Tracks</button>
            <button className={!this.state.isDefaultState ? 'd-none m-3 sequencer-button' : 'm-3 sequencer-button'} onClick={() => this.addStep()}><i className="fa fa-plus-circle"></i> Steps</button>
          </Col>
        </Row>
        <Row className={this.state.isPlaying ? 'd-none' : null}>
          <Col xs="2">
            <h5>Bpm</h5>
          </Col>
          <Col xs="8" className="bpm">
            <input className="bpm-slider" type='range' min={60} max={700} value={this.state.bpm} onChange={this.handleBPMChange}/>
          </Col>
          <Col xs="2">
            <h5>{this.state.bpm}</h5>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

