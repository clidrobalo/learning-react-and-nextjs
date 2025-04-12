import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Form from "./components/Form";

let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

function handleSelectItem(item: string) {
  console.log(item);
}

function App() {
  const [alertText, _] = useState("Toggle");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary mb-2"
        onClick={() => {
          setShowAlert(!showAlert);
        }}
      >
        {!showAlert && <BsToggleOff className="mx-2" />}
        {showAlert && <BsToggleOn className="mx-2" />}
        {alertText}
      </button>
      {showAlert && (
        <Alert onClose={() => setShowAlert(!showAlert)}>This is a alert</Alert>
      )}
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />

      <hr />
      <h1>Forms</h1>

      <Form />
    </div>
  );
}

export default App;
