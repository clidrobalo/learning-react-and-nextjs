// import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver for schema validation

const schema = z.object({
  name: z.string().min(3), // Name must be a string with a minimum length of 3
  password: z.string(), // Password must be a string
});

type LoginForm = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) }); // Initialize react-hook-form for form handling

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
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
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
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default Form;
