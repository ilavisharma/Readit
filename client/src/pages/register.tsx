import Head from "next/head";
import Link from "next/link";

const register = () => {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
      </Head>

      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('images/bricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-64">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff from Reddit
              </label>
            </div>
            <div className="mb-2">
              <input
                type="email"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                placeholder="Username"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                placeholder="Password"
              />
            </div>
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              sign up
            </button>
          </form>
          <small>
            Already a redditor?
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
