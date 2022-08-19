import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {User} from "./types"

const Detail: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User|undefined>(undefined)
  const params = useParams();
      useEffect(() => {
        console.log("useEffect")
        const fetchUser = async () => {
          try {
              const response = await axios.get(`http://localhost:3000/users/${params.id}`)
              const userData: User = response.data
              setUser(userData);
              console.log(user)
          } catch (error) {
              console.log(error)
          }
        }
        fetchUser();
      }, [])
  
    useEffect(() => {
      console.log(user)
    }, [user])

  return (<>
    {user ? <div>
      <ul>
        <li>id: {user.id}</li>
        <li>avatar: {user.avatar}</li>
        <li>company name: {user.company.name}</li>
        <li>company department: {user.company.department}</li>
        <li>Date of Birth: {user.dob}</li>
        <li>email: {user.email}</li>
        <li>email verified: {user.emailVerified ? "true" : "false"}</li>
        <li>First name: {user.first_name}</li>
        <li>Last name: {user.last_name}</li>
        <li>Skills: {user.skills.join(",")}</li>
      </ul>
    </div>:<div>User not found</div>}
    </>
  )
}

export default Detail