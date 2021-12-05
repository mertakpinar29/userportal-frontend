import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { deleteUser, getUsers } from '../axios'
import { Button, List, Result } from 'antd'

const Userscreen = ({ user, setUser }) => {
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState()

    // function for signing out
    const exit = () => {
        localStorage.removeItem('user')
        setUser()
    }

    // function for fetching the users
    const fetchUsers = async () => {
        const { data } = await getUsers()
        const filteredData = data.filter(data => data.id !== user.id)
        setUsers(filteredData)
    }

    const removeUser = async (userId) => {
        try {
            await deleteUser(userId)
            // after delete, fetch users to show latest data
            fetchUsers()
        } catch (error) {
            setErrorMessage(error.response && error.response.data.message
                ? error.response.data.message
                : error.message)
        }
    }
    
    // get the users
    useEffect(() => {
        fetchUsers()
    }, [user])

    return (
        <div className='wrapper'>
            <div className='container'>
                {errorMessage && <Result title={errorMessage}></Result>}
                    <List
                        header={<h1>Users</h1>}
                        footer={
                            <Button className='custom-button' onClick={() => {exit()}}>EXIT</Button>
                        }
                        bordered
                        dataSource={users}
                        renderItem={item => (
                                <>
                                <br />
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<UserOutlined />}
                                        title={<h3>{item.fullname}</h3>}
                                        description={<h4>{item.email}</h4>}
                                        >
                                        </List.Item.Meta>
                                        <div style={{display:'flex', justifyContent:'space-evenly'}}>
                                            <Link to={`/update/${item.id}`} state={{ user: item }} >
                                                <FormOutlined style={{cursor: 'pointer'}} />
                                            </Link>
                                            <div style={{color: 'red'}}>
                                                <DeleteOutlined onClick={() => {removeUser(item.id)}} style={{cursor: 'pointer'}} />
                                            </div>
                                        </div>
                                    </List.Item>
                                <br />   
                                </>
                        )}
                    ></List>
            </div>
        </div>
    )
}

export default Userscreen
