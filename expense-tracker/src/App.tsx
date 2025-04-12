import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Groceries", amount: 50, category: "Groceries" },
    { id: 2, description: "Rent", amount: 1200, category: "Utilities" },
    { id: 3, description: "Utilities", amount: 200, category: "Utilities" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredExpenses =
    selectedCategory === ""
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  const onDelete = (id: number) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const onSubmit = (data: {
    description: string;
    amount: number;
    category: string;
  }) => {
    const newExpense = {
      id: expenses.length + 1,
      ...data,
    };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Expense Tracker</h1>
      <ExpenseForm onSubmit={onSubmit} />

      <hr />

      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList expenses={filteredExpenses} onDelete={onDelete} />
    </div>
  );
}

export default App;
