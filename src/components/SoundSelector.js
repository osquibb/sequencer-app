import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SoundSelector extends Component {

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
    const sounds = this.props.sounds;
    return(
      <UncontrolledDropdown size="sm">
        <DropdownToggle caret>
          {sounds[this.state.selectedSoundIdx]}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem active={this.state.selectedSoundIdx === 0}
                        onClick={() => this.changeSelectedSound(0)}>
          {sounds[0]}
          </DropdownItem>
          <DropdownItem active={this.state.selectedSoundIdx === 1}
                        onClick={() => this.changeSelectedSound(1)}>
          {sounds[1]}
          </DropdownItem>
          <DropdownItem active={this.state.selectedSoundIdx === 2}
                        onClick={() => this.changeSelectedSound(2)}>
          {sounds[2]}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}