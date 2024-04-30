import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

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
        console.log("Auth Token: ", loginRes.data.token);

        localStorage.setItem('authToken', loginRes.data.token)

        setTimeout(() => {
          alert("Login successfully");
          navigate("/");
        }, 5);
      }
    } catch (error) {
      console.log("Error: ", error);
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
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </Form.Field>
          {errors.email && <p>Please check the Email</p>}
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

export default Login;
