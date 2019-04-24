import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SoundSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
                    selectedSoundIdx: 0
                  };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.selectedSoundIdx !== this.state.selectedSoundIdx){
      const rowIdx = this.props.row - 1;
      this.props.handleSoundSelect(rowIdx, this.state.selectedSoundIdx);
    }
  }

  changeSelectedSound(rowIdx, soundIdx) {
    this.setState({selectedSoundIdx: soundIdx});
    this.props.handleSoundSelect(rowIdx, soundIdx);
  }

  
  render() {
    const sounds = this.props.sounds;
    const rowIdx = this.props.row - 1;

    const dropDownSounds = sounds.map((sound, idx) => {
      return(
      <DropdownItem key={idx}
                    active={this.state.selectedSoundIdx === idx}
                    onClick={() => this.changeSelectedSound(rowIdx, idx)}>
        {sound}
      </DropdownItem>
      );
    });

    return(
      <UncontrolledDropdown size="sm">
        <DropdownToggle caret>
          {sounds[this.state.selectedSoundIdx]}
        </DropdownToggle>
        <DropdownMenu>
          {dropDownSounds}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}