import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Sequencer from './components/Sequencer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Sequencer tracks='2' steps='8' bpm='120' />
      </Container>
    );
  }
}

export default App;
