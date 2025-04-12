import { useState } from "react";

// Props interface for ListGroup component
// This interface defines the expected props for the ListGroup component
interface ListGroupProp {
  heading: string;
  items: string[];
  onSelectItem?: (item: string) => void;
}

// ListGroup component
// This component renders a list of items with a heading and handles item selection
// It uses the useState hook to manage the selected item index
// and calls the onSelectItem callback when an item is clicked
// It also displays a message when no items are found
function ListGroup({ items, heading, onSelectItem }: ListGroupProp) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.length === 0 && <p>No items found</p>}
        {items.map((item, index) => (
          <li
            key={index}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem?.(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
