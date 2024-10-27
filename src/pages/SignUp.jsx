import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { signUp } from '../services/UserService';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };

  const resetting = () => {
    setData({
      name: '',
      email: '',
      password: '',
      about: '',
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Name validation
    if (data.name.trim() === '') {
      errors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (data.email.trim() === '') {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(data.email)) {
      errors.email = "Email is not valid";
      isValid = false;
    }

    // Password validation (Minimum length 8 characters)
    if (data.password.trim() === '') {
      errors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    // About validation
    if (data.about.trim() === '') {
      errors.about = "About section is required";
      isValid = false;
    }

    setError({ errors, isError: !isValid });
    return isValid;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    console.log(data);

    signUp(data)
      .then((res) => {
        console.log(res);
        console.log("User Registered Successfully");
        toast.success("User Successfully Registered");
        setData({
          name: '',
          email: '',
          password: '',
          about: '',
        });
      })
      .catch((error) => {
        console.log("Error Occurred", error);
        setError({
          errors: error.response.data.errors,
          isError: true,
        });
      });
  };

  useEffect(() => {}, [data]);

  return (
    <Base>
      <Container>
        <Row className='mt-3'>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color='dark' outline>
              <CardHeader>
                <h3>Fill Information to Register</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for='name'>Enter Name</Label>
                    <Input
                      type='text'
                      placeholder='Enter here'
                      id='name'
                      onChange={(e) => handleChange(e, 'name')}
                      value={data.name}
                    />
                    {error.errors.name && <small className="text-danger">{error.errors.name}</small>}
                  </FormGroup>

                  <FormGroup>
                    <Label for='email'>Enter Email</Label>
                    <Input
                      type='email'
                      placeholder='Enter here'
                      id='email'
                      onChange={(e) => handleChange(e, 'email')}
                      value={data.email}
                    />
                     <small className="text-danger">{error.errors.email}</small>
                  </FormGroup>

                  <FormGroup>
                    <Label for='password'>Enter Password</Label>
                    <Input
                      type='password'
                      placeholder='Enter here'
                      id='password'
                      onChange={(e) => handleChange(e, 'password')}
                      value={data.password}
                    />
                    {error.errors.password && <small className="text-danger">{error.errors.password}</small>}
                  </FormGroup>

                  <FormGroup>
                    <Label for='about'>Enter About</Label>
                    <Input
                      type='textarea'
                      placeholder='Enter here'
                      id='about'
                      style={{ height: "200px" }}
                      onChange={(e) => handleChange(e, 'about')}
                      value={data.about}
                    />
                    {error.errors.about && <small className="text-danger">{error.errors.about}</small>}
                  </FormGroup>

                  <Container className='text-center'>
                    <Button color='dark' outline>Register</Button>
                    <Button onClick={resetting} color='dark' outline type='reset' className='ms-2'>Reset</Button>
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

export default SignUp;
