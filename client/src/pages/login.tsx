import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import axios from "axios";
import InputGroup from "../components/InputGroup";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(
        "/auth/login",
        {
          password,
          username,
        },
        { withCredentials: true }
      );
      router.push("/");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('images/bricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Log In</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={handleSubmit}>
            <InputGroup
              type="text"
              className="mb-2"
              value={username}
              setValue={setUsername}
              placeholder="Username"
              error={errors.username}
            />

            <InputGroup
              type="password"
              className="mb-4"
              value={password}
              setValue={setPassword}
              placeholder="password"
              error={errors.password}
            />

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Login
            </button>
          </form>
          <small>
            New to Readit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Register</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default login;
