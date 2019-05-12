import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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

  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({modal: false});
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row className="text-center mt-4">
            <Col>
              <h2>Step Sequencer</h2>
            </Col>
          </Row>
          <Sequencer sounds={sounds}
                     soundUrls={soundUrls} 
          />
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggle}>How to Play</ModalHeader>
        <ModalBody>
          <ol>
            <li>Click on cells in the sequencer</li>
            <li>Then press play!</li>
          </ol>
          <p>(Hint: Try adding tracks and changing the sounds!)</p>
        </ModalBody>
        <ModalFooter>
          <Button color="info" outline onClick={this.toggleModal}>Got it!</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
    );
  }
}

export default App;
