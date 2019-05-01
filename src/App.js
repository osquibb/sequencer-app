import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Sequencer from './components/Sequencer.js';
import './App.css';

const sounds = ['Kick', 'Snare', 'Castanets', 'Cymbals', 'Tambourine', 'Woodblock'];
const soundUrls = ['./sounds/kick.mp3',
                  './sounds/snare.mp3',
                  './sounds/castanets.mp3',
                  './sounds/cymbals.mp3',
                  './sounds/tambourine.mp3',
                  './sounds/woodblock.mp3'];

class App extends Component {

  render() {
    return (
      <Container>
        <Sequencer sounds={sounds} soundUrls={soundUrls} />
      </Container>
    );
  }
}

export default App;
