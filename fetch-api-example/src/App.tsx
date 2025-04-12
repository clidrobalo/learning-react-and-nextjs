import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error instanceof axios.Cancel) {
          console.log("Request canceled", error.message);
          return;
        }

        console.error("Error fetching users:", error);
        setError(
          "Failed to fetch users, status code: " + error.response?.status
        );
      });

    return () => {
      // Cancel the request if the component unmounts
      cancelToken.cancel("Request canceled by cleanup function");
    };
  }, []);

  return (
    <div className="container p-5">
      <h1>API Fetch</h1>

      <h2>Users</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
