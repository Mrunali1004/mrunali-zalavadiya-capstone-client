/* eslint-disable no-useless-escape */
import React from "react";
import { Form, Segment } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import "./Signup.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const onSubmit = async (e) => {
    try {
      const signUpRes = await axios.post(`http://localhost:1010/auth/signup`, {
        username: e.username,
        email: e.email,
        password: e.password,
      });
      console.log(signUpRes);

      if (signUpRes.status === 201) {
        toast("Registered successfully... Redirecting to Login Page....");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    // <section className="fixed-container">
    <section className="site-signup">
      <Segment>
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <Form.Field>
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              placeholder="User Name"
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="error">Please required User Name</p>
            )}
          </Form.Field>
          <Form.Field>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </Form.Field>
          {errors.email && errors.email.type === "required" && (
            <p className="error">Email is required</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="error">Invalid email address</p>
          )}
          <Form.Field>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
                },
              })}
            />
          </Form.Field>
          {errors.password && errors.password.type === "required" && (
            <p className="error">Password is required</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="error">{errors.password.message}</p>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <p className="error">{errors.password.message}</p>
          )}
          <div className="form-button">
            <button type="submit" className="form-button__btnnn">
              Submit
            </button>
          </div>
          <Link to="/login">
            <div className="form-data">
              <p className="form-labell">Back to Login? Click me </p>
            </div>
          </Link>
        </Form>
      </Segment>
    </section>
  );
};

export default Signup;
