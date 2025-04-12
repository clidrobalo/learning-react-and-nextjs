// import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface loginForm {
  name: string; // Name field
  password: string; // Password field
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>(); // Initialize react-hook-form for form handling

  const onSubmit = (data: FieldValues) => {
    console.log(errors);
    console.log(data);
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name?.type === "required" && (
          <p className="text-danger">The name field is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">
            The name field must be at least 3 characters
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          {...register("password")} // Register the password input with react-hook-form
          id="password"
          type="password"
          className="form-control"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default Form;
