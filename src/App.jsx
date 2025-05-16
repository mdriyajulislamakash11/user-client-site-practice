import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const user2 = { name, email };
    console.log(user2);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user2)
    })
      .then((res) => res.json())
      .then((data) => setUsers([...users, data]));
  };

  return (
    <>
      <h1>User Client Site Send To Data</h1>
      <h3>User Informations: {users.length}</h3>

      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* show user info UI */}
      {users.map((info) => (
        <p key={info.id}>
          {info.id} {info.name} {info.email}
        </p>
      ))}
    </>
  );
}

export default App;
