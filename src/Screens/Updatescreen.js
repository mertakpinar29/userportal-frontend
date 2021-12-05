import React, { useState } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import { Form, Button, Input, Result } from 'antd'
import { updateUser } from '../axios'

const Updatescreen = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = location.state

    const [errorMessage, setErrorMessage] = useState()

    const onUpdate = async (values) => {
        try {
            await updateUser(user.id, values)
            navigate('/')
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
                        <>
                            <h1>Update user</h1>
                            <Form  
                                className='form'
                                name="basic"
                                labelCol={{
                                  span: 8,
                                }}
                                wrapperCol={{
                                  span: 16,
                                }}
                                initialValues={{
                                  email: user.email,
                                  fullname: user.fullname
                                }}
                                onFinish={onUpdate}
                                autoComplete="off"
                            >
                                <Form.Item
                                  label="Email"
                                  name="email"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input email!',
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
                                      message: 'Please input fullname!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              
                                <Form.Item
                                    wrapperCol={{
                                      offset: 8,
                                      span: 16,
                                    }}
                                  >
                                    <Button htmlType="submit">
                                      UPDATE
                                    </Button>
                                  </Form.Item> 
                            </Form>
                        </>
            </div>
        </div>
    )
}

export default Updatescreen
