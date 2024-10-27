import React, { useState } from 'react';
import Base from '../components/Base';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { doLogin } from '../auth';
import {  useNavigate } from 'react-router-dom';


const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleChange = (event, field) => {
    setLoginData({ ...loginData, [field]: event.target.value });
  };

 
    const handleLogin = (event) => {
      event.preventDefault();
      
      doLogin(loginData, 
        (response) => {
          console.log("Login successful", response);
          navigate("/user/dashboard")
          
        }, 
        (error) => {
          console.error("Login failed", error);
        }
      );
    };

  return (
    <Base>
      <Container>
        <Row className='mt-5'>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color='dark' outline>
              <CardHeader>
                <h3>Fill Your Login Details</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <Label for='email'>Enter Email</Label>
                    <Input
                      type='email'
                      placeholder='Enter Email'
                      id='email'
                      onChange={(e) => handleChange(e, 'email')}
                      value={loginData.email}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for='password'>Enter Password</Label>
                    <Input
                      type='password'
                      placeholder='Enter Password'
                      id='password'
                      onChange={(e) => handleChange(e, 'password')}
                      value={loginData.password}
                    />
                  </FormGroup>

                  <Container className='text-center'>
                    <Button color='dark' outline type='submit'>Login</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
