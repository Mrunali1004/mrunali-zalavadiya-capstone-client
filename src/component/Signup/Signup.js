import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// const API_URL = process.env.Api_url;
// console.log(API_URL);

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const onSubmit = async (e) => {
    // e.preventDefault();
    // ${API_URL}
    try {
      const signUpRes = await axios.post(`http://localhost:1010/auth/signup`, {
        username: e.username,
        email: e.email,
        password: e.password,
      });
      console.log(signUpRes);

      if (signUpRes.status === 201) {
        setTimeout(() => {
          alert("Registered successfully");
          navigate("/login");
        }, 5);
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    console.log(e.username);
    console.log(e.email);
    console.log(e.password);

    // reset();
  };

  return (
    <section className="fixed-container">
      <section className="site-signup">
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <Form.Field>
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              placeholder="User Name"
              type="text"
              {...register("username", { required: true, maxLength: 10 })}
            />
            {errors.username && <p>Please check the User Name</p>}
          </Form.Field>
          <Form.Field>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </Form.Field>
          {errors.email && <p>Please check the Email</p>}
          <Form.Field>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              })}
            />
          </Form.Field>
          {errors.password && <p>Please check the Password</p>}
          <div className="form-button">
            <Button type="submit" className="form-button__btn">
              Submit
            </Button>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default Signup;
