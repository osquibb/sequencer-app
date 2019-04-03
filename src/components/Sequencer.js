import React, { Component, Fragment } from 'react';
import { Container, Table, Row } from 'reactstrap';

function SequencerRow({track, steps, isHeader=false}) {
  const sequencerRow = [];
  let step = 1
  if(isHeader) {
    sequencerRow.push(<th key='header-none'></th>);
    while(step <= steps) {
      sequencerRow.push(<th key={'header-' + step}>{step}</th>);
      step++;
    }
    return (
      <tr className="text-center">
      {sequencerRow}
      </tr>
    );
  } else {
    while(step <= steps) {
      sequencerRow.push(<td key={track+'-'+step} id={track+'-'+step}></td>);
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
    .push(<SequencerRow track={track}
                              steps={props.steps}/>)
    track++
  }
  return sequencerTrackRows;
}

class Sequencer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <Fragment>
        <h3 className="text-center">Sequencer</h3>
        <Table bordered className="mt-2">
          <thead>
            <SequencerRow steps={this.props.steps} isHeader={true}/>
          </thead>
          <tbody>
            <SequencerTrackRows tracks={this.props.tracks} steps={this.props.steps} />
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default Sequencer;
