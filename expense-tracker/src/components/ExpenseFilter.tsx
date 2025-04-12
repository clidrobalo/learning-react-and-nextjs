import categories from "../categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="mb-3">Filter by category</h2>
      </div>
      <select
        className="form-select mb-4"
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default ExpenseFilter;
