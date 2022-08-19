import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {User} from "./types"

const List: React.FC = (): JSX.Element => {

    const [users, setUsers] = useState<Array<User>>([])

    useEffect(() => {
        console.log("useEffect")
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users")
                const userData: Array<User> = response.data
                setUsers(userData);
                console.log(users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers();
    }, [])

    useEffect(() => {
      console.log(users)
    }, [users])
    
    
    return (
      <>
            <div>Users</div>
            {users.map(user => {
                return (<div>{`${user.first_name} ${user.last_name}`}</div>)
            })}
      </>
  )
}

export default List