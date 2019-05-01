import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Sequencer from './components/Sequencer.js';
import './App.css';

const sounds = ['Kick', 'Snare', 'Castanets', 'Cymbals', 'Tambourine', 'Woodblock'];
const soundUrls = ['https://osquibb.github.io/public/sounds/kick.mp3',
                  'https://osquibb.github.io/public/sounds/snare.mp3',
                  'https://osquibb.github.io/public/sounds/castanets.mp3',
                  'https://osquibb.github.io/public/sounds/cymbals.mp3',
                  'https://osquibb.github.io/public/sounds/tambourine.mp3',
                  'https://osquibb.github.io/public/sounds/woodblock.mp3'];

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
