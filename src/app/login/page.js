"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-500 to-green-00">
      <div className="bg-white rounded-3xl shadow-lg flex overflow-hidden max-w-5xl w-full">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember Password</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition cursor-pointer"
            >
              Login
            </button>
            <p className="text-center text-gray-500 text-sm">
              No account yet?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-400 text-sm mb-4">
              Or Login With
            </p>
            <div className="flex justify-center gap-4">
              <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 bg-blue-800 cursor-pointer">
                <Image
                  src="/Images/youtube.svg"
                  alt="youtube"
                  className="w-5 h-5"
                  width={50}
                  height={50}
                />
              </button>
              <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 bg-blue-800 cursor-pointer">
                <Image
                  src="/Images/x.svg"
                  alt="twitter"
                  className="w-5 h-5"
                  width={50}
                  height={50}
                />
              </button>
              <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 bg-blue-800 cursor-pointer">
                <Image
                  src="/Images/fb.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                  width={50}
                  height={50}
                />
              </button>
              <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <Image
                  src="/Images/google.png"
                  alt="Google"
                  className="w-5 h-5"
                  width={50}
                  height={50}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-10">
          <Image
            src="/Images/sports-img.png"
            alt="Login Illustration"
            width={600}
            height={600}
            className="w-90 h-90 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
