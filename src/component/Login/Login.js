import React from "react";
import { Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

import { toast } from "react-toastify";
import { updateToken } from "../../utils/data.service";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    try {
      const loginRes = await axios.post(`http://localhost:1010/auth/login`, {
        email: e.email,
        password: e.password,
      });
      console.log(loginRes);

      if (loginRes.status === 200) {
        console.log(loginRes.status, loginRes.data);
        sessionStorage.setItem("authToken", loginRes.data.token);
        updateToken(loginRes.data.token);
        toast("Login Successful ");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Email not found. Please check or sign up.");
      }
    }
  };

  return (
    <section className="fixed-container">
      <section className="site-login">
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
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
                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              })}
            />
          </Form.Field>
          {errors.password && <p className="error">Please required Password</p>}
          <div className="form-button">
            <button type="submit" className="form-button__btnnn">
              Submit
            </button>
          </div>

          <Link to="/signup">
            <div className="form-data">
              <p className="form-labell">Not a member? Register</p>
            </div>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default Login;
