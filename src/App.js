import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Sequencer from './components/Sequencer.js';
import './App.css';

const sounds = ['Kick', 'Snare', 'Castanets']
const soundUrls = ['./public/sounds/bass-drum__025_forte_bass-drum-mallet.mp3',
                  './public/sounds/snare-drum__025_forte_with-snares.mp3',
                  './public/sounds/castanets__025_mezzo-forte_struck-singly.mp3']

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
