import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import Title from './JumboTron';
import Steps from './Step'


class HomePage extends Component {

  render() {
    return (
      <div>
        <Title/>
          <Container>
            <Steps/>
          </Container>
      </div>


    );
  }
}

export default HomePage;
