import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { loadingMachine } from "./loadingMachine";
import { Rings } from "react-loader-spinner";
import { User } from "./types";

const List: React.FC = (props): JSX.Element => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [current, send] = useMachine(loadingMachine);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
        if (response.data) {
          send("SUCCESS");
        } else {
          send("FAILURE");
        }
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
        {current.matches("loading") && (
          <Rings color="#00BFFF" height={80} width={80} />
        )}
        {current.matches("userFound") && (
          <table>
            <tbody>
              <tr>
                <th>First name</th>
                <th>Last name</th>
              </tr>
              {users.map((user, index) => {
                return (
                  <tr key={"tableRow" + index}>
                    <td>
                      <Link className="nav-link" to={`/users/${user.id}`}>
                        {user.first_name}
                      </Link>
                    </td>
                    <td>
                      <Link className="nav-link" to={`/users/${user.id}`}>
                        {user.last_name}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default List;
