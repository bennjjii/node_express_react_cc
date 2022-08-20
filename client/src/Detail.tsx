import axios from "axios";
import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { loadingMachine } from "./loadingMachine";
import { useParams } from "react-router-dom";
import { User } from "./types";
import { Rings } from "react-loader-spinner";

const Detail: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const [current, send] = useMachine(loadingMachine);
  const params = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${params.id}`
        );
        setUser(response.data);
        if (response.data) {
          send("SUCCESS");
        } else {
          send("FAILURE");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="details-container-container">
      <div className="details-container">
        {current.matches("loading") && (
          <Rings color="#00BFFF" height={80} width={80} />
        )}
        {current.matches("userFound") && (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>First name </td>
                  <td>{user?.first_name}</td>
                </tr>
                <tr>
                  <td>Last name</td>
                  <td>{user?.last_name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{user?.dob}</td>
                </tr>
                <tr>
                  <td>Skills</td>
                  <td>{user?.skills.join(", ")}</td>
                </tr>
                <tr>
                  <td>Company Name</td>
                  <td>{user?.company.name}</td>
                </tr>
                <tr>
                  <td>Company Department</td>
                  <td>{user?.company.department}</td>
                </tr>
                <tr>
                  <td>Email verified?</td>
                  <td>{user?.emailVerified ? "true" : "false"}</td>
                </tr>
                <tr>
                  <td>Avatar</td>
                  <td>{user?.avatar}</td>
                </tr>
                <tr>
                  <td>Id</td>
                  <td>{user?.id}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {current.matches("userNotFound") && <div>User not found</div>}
      </div>
    </div>
  );
};

export default Detail;
