"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [providers, setProviders] = useState(false);
  useEffect(() => {
    const setAuthProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProvider();
  }, []);

  return (
    <section className="bg-blue-50 min-h-screen flex-grow">
      <div className="container m-auto max-w-lg py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
            <div className="mb-4">
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="button"
                    onClick={() => signIn(provider.id)}
                  >
                    <FaGoogle className="text-white mr-2" /> Login with Google
                  </button>
                ))}
            </div>

            <div className="my-6 font-semibold text-center">
              Or log in with your email address
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Email address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Password"
                required
              />
            </div>

            {/*  Submit Button  */}
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="my-6  text-center">
            Don't have an account ?{" "}
            <span>
              {" "}
              <Link
                className="text-blue-500 hover:text-blue-600"
                href="/register"
              >
                Sign Up
              </Link>{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default LoginPage;
