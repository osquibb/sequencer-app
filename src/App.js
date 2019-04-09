import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CustomSequencer from './components/CustomSequencer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <CustomSequencer />
      </Container>
    );
  }
}

export default App;
