import React, { useState } from 'react'
import { Form, Input, Button, Result } from 'antd'
import { login, register } from '../axios';

const Authscreen = ({ setUser }) => {
    // variable for transitioning between forms
    const [isLogin, setIsLogin] = useState(true)
    // variable to show error messages
    const [errorMessage, setErrorMessage] = useState()

    const onLogin = async (values) => {
        try {
            const { data } = await login(values)
            localStorage.setItem('user', JSON.stringify(data.user))
            setUser(data.user)
        } catch (error) {
            setErrorMessage(error.response && error.response.data.message
                ? error.response.data.message
                : error.message)
        }
      };

    const onRegister = async (values) => {
        try {
            const { data } = await register(values)
            localStorage.setItem('user', JSON.stringify(data.createdUser))
            setUser(data.createdUser)
        } catch (error) {
            setErrorMessage(error.response && error.response.data.message
                ? error.response.data.message
                : error.message)
        }
    };
    return (
        <div className='wrapper'>
            <div className='container'>
                {errorMessage && <Result title={errorMessage}></Result>}
                {
                    isLogin ? 
                    (
                        <>
                            <h1>Sign in</h1>
                            <Form  
                                className='form'
                                name="basic"
                                labelCol={{
                                  span: 8,
                                }}
                                wrapperCol={{
                                  span: 16,
                                }}
                                onFinish={onLogin}
                                autoComplete="off"
                            >
                                <Form.Item
                                  label="Email"
                                  name="email"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your email!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              
                                <Form.Item
                                  label="Password"
                                  name="password"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your password!',
                                    },
                                  ]}
                                >
                                  <Input.Password />
                                </Form.Item>
                              
                                <Form.Item
                                    wrapperCol={{
                                      offset: 8,
                                      span: 16,
                                    }}
                                  >
                                    <Button htmlType="submit">
                                      Login
                                    </Button>
                                  </Form.Item> 
                                
                                <Form.Item 
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <h4 
                                    style={{marginTop: '0.5rem', cursor: 'pointer'}}
                                    onClick={() => {setIsLogin(!isLogin)}}
                                    >Don't have an account yet? Register</h4>
                                </Form.Item>
                            </Form>
                        </>
                    ) : (
                        <>
                            <h1>Register</h1>
                            <Form  
                                className='form'
                                name="basic"
                                labelCol={{
                                  span: 8,
                                }}
                                wrapperCol={{
                                  span: 16,
                                }}
                                onFinish={onRegister}
                                autoComplete="off"
                            >
                                <Form.Item
                                  label="Email"
                                  name="email"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your email!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>

                                <Form.Item
                                  label="Name"
                                  name="fullname"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your fullname!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              
                                <Form.Item
                                  label="Password"
                                  name="password"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your password!',
                                    },
                                  ]}
                                >
                                  <Input.Password />
                                </Form.Item>
                              
                                <Form.Item
                                    wrapperCol={{
                                      offset: 8,
                                      span: 16,
                                    }}
                                  >
                                    <Button htmlType="submit">
                                      Register
                                    </Button>
                                  </Form.Item> 
                                
                                <Form.Item 
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <h4 
                                    style={{marginTop: '0.5rem', cursor: 'pointer'}}
                                    onClick={() => {setIsLogin(!isLogin)}}
                                    >Already have an account? Sign in</h4>
                                </Form.Item>
                            </Form>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Authscreen
