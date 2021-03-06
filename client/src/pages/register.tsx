import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import InputGroup from "../components/InputGroup";
import { useAuthState } from "../Context/AuthContext";

const register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const { authenticated } = useAuthState();
  if (authenticated) router.push("/");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&C" });
      return;
    }
    try {
      await axios.post("/auth/register", {
        email,
        password,
        username,
      });
      router.push("/login");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('images/bricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6 ">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff from Reddit
              </label>
              <small className="block font-medium text-red-600">
                {errors.agreement}
              </small>
            </div>

            <InputGroup
              type="email"
              className="mb-2"
              value={email}
              setValue={setEmail}
              placeholder="Email"
              error={errors.email}
            />

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
              sign up
            </button>
          </form>
          <small>
            Already a readitor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default register;
