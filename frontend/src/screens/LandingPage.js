import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import './LandingStyles.css'

const LandingPage = () => {
  return (<div className='main'>
    <Container>
      <Row>
        <div className='intro-text'>
          <div>
            <h1 className='title'>Welcome to Esports Elevated</h1>
            <p className='subtitle'>Elevate your game!</p>

          </div>
          <div className='button-container'>
            {/* <a href='/login'>
              <Button size='lg' className='landingbutton'>Login</Button>
            </a> */}
            <a href='/signup'>
              <Button size='lg' className='landingbutton' variant="outline-light">Sign Up</Button>
            </a>
          </div>
        </div>
      </Row>
    </Container>
  </div>
    )
}

export default LandingPage
