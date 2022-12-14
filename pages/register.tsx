import type { NextPage } from "next";
import { useState } from "react";

const Register: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-w-screen max-w-screen min-h-screen max-h-screen text-white bg-black/40">
      <img
        src="/backround.png"
        className="-z-20 top-0 left-0 opacity-75 fixed h-screen w-screen"
      />
      <main className="p-5 border-2 border-white rounded-md">
        <h2 className="text-3xl text-white">Register</h2>
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Email"
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <button
          onClick={() => {
            fetch("/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            }).then(() => {
              window.location.pathname = "/dashboard";
            });
          }}
          className="w-full text-center mt-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none text-white"
        >
          Register
        </button>
        <h1>
          Have an account?{' '}
          <a className="text-blue-300" href="/login">
            Login Here!
          </a>
        </h1>
      </main>
    </div>
  );
};

export default Register;
