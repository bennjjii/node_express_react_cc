import axios from "axios";
import React, { useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";
import { User } from "./types";

const List: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const userData: Array<User> = response.data;
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="users-container">
        <h2 className="users-title">Users</h2>
        {loading && <Rings color="#00BFFF" height={80} width={80} />}
        <table>
          <tbody>
            <tr>
              <th>First name</th>
              <th>Last name</th>
            </tr>
            {users.map((user, index) => {
              return (
                <tr key={"tableRow" + index}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
