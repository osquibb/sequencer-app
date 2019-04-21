import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col, UncontrolledDropdown, 
         DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Tone from 'tone';

function SequencerRow({activeStep, seqRow, addSound, row, steps, isHeader=false}) {
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
        <SoundSelector/>
        </th>
        {sequencerRow}
      </tr>
    );
  }
}

class SoundSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
                    selectedSoundIdx: 0
                  };
  }

  changeSelectedSound(index) {
    this.setState({selectedSoundIdx: index});
  }

  render() {
    return(
      <UncontrolledDropdown size="sm">
        <DropdownToggle caret>
          Sound
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem active={this.state.selectedSoundIdx === 0}
                        onClick={() => this.changeSelectedSound(0)}>
          Kick
          </DropdownItem>
          <DropdownItem active={this.state.selectedSoundIdx === 1}
                        onClick={() => this.changeSelectedSound(1)}>
          Snare
          </DropdownItem>
          <DropdownItem active={this.state.selectedSoundIdx === 2}
                        onClick={() => this.changeSelectedSound(2)}>
          Hi-Hat
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
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
                        activeStep={props.activeStep}
                        seqRow={props.sequencer[row-1].rowSeq}
                        addSound={props.addSound}
                        row={row}
                        steps={props.steps}/>)
    row++
  }
  return sequencerTrackRows;
}

class Sequencer extends Component {

  constructor(props) {
    const rows = 2; // initial num of tracks
    const steps = 8; // inital num of steps

    super(props);
    this.state = {
      isDefaultState: true,
      bpm: 120,
      activeStep: 0,
      sequencer: new Array(rows).fill({ rowSeq: new Array(steps).fill(null),
                                          rowSound: null
                                        })
    };
    this.stopSequencer = this.stopSequencer.bind(this);
    this.resetSequencer = this.resetSequencer.bind(this);
    this.addSound = this.addSound.bind(this);
  };

  addTrack() {
    const seq = this.state.sequencer.map(row => ({...row}));
    seq.push(
              {
                rowSeq: new Array(seq[0].rowSeq.length).fill(null),
                rowSound: null
              }
    );

    this.setState({sequencer: seq});
  }
  
  addStep() {
    const seq = this.state.sequencer.map(row => ({...row}));

    for(let row in seq) {
      seq[row].rowSeq = [...seq[row].rowSeq, null];
    }
    this.setState({ sequencer: seq });
  }

  componentDidUpdate(){
    let synth = new Tone.Synth().toMaster();

    for(let row in this.state.sequencer) {
      if(this.state.sequencer[row].rowSeq[this.state.activeStep] !== null){
        const note = 'C' + (parseInt(row) + 4)
        synth.triggerAttackRelease(note, "16n");
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

resetSequencer() {
  this.setState({isDefaultState: true});
  clearInterval(this.activeStepID);
  this.setState({activeStep: 0});
  const resetSeq = new Array(this.state.sequencer.length)
                    .fill({
                            rowSeq: new Array(this.state.sequencer[0].rowSeq.length).fill(null),
                            rowSound: null
                          }
                  );
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
