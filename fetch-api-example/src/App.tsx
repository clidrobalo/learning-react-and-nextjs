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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof axios.Cancel) {
          console.log("Request canceled", error.message);
          setError(null);
          return;
        }

        setLoading(false);
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

  function onDelete(id: number) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        console.log("User deleted successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError(
          "Failed to delete user, status code: " + error.response?.status
        );
        setLoading(false);
      });
  }

  return (
    <div className="container p-5">
      <h1>API Fetch</h1>

      <h2>Users</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && <div className="spinner-border">Loading...</div>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
