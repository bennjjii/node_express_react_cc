import axios from "axios";
import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { loadingMachine } from "./loadingMachine";
import { Rings } from "react-loader-spinner";
import { User } from "./types";

const List: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [current, send] = useMachine(loadingMachine);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
        setLoading(false);
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
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
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
