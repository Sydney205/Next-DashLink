"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useQueryParam } from "@/hooks/useQueryParam";
import Navbar from "@/components/Navbar";

// Regular Expressions
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{2,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

function AuthForm() {
  const router = useRouter();
  const isLoggingIn = useQueryParam("isLoggingIn", true);

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate inputs
  useEffect(() => setValidName(NAME_REGEX.test(name)), [name]);
  useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);
  useEffect(() => setValidPassword(PASSWORD_REGEX.test(password)), [password]);

  const switchAccountState = () => {
    router.push(`/auth/signin?isLoggingIn=${!isLoggingIn}`);
  };

  // Signup function
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validName || !validEmail || !validPassword) {
      setError("Invalid inputs. Please check your details.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token); // Store auth token
      router.push("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validEmail || !validPassword) {
      setError("Invalid credentials.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token); // Store auth token
      router.push("/dashboard"); // Redirect after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen flex flex-col justify-center items-center">
        <form
          className="w-3/4 flex flex-col justify-center items-center gap-8"
          onSubmit={isLoggingIn ? handleLogin : handleSignup}
        >
          {!isLoggingIn && (
            <div className="w-2/4">
              <label className="block text-lg font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 border ${validName ? "border-green-500" : "border-red-500"}`}
                required={!isLoggingIn}
              />
            </div>
          )}

          <div className="w-2/4">
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border ${validEmail ? "border-green-500" : "border-red-500"}`}
              required
            />
          </div>

          <div className="w-2/4">
            <label className="block text-lg font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border ${validPassword ? "border-green-500" : "border-red-500"}`}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-2/4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            {loading ? "Processing..." : isLoggingIn ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="flex gap-2 mt-6">
          <p>{isLoggingIn ? "Don't have an account?" : "Already have an account?"}</p>
          <button onClick={switchAccountState} className="text-blue-500 hover:underline">
            {isLoggingIn ? "Sign up" : "Login"}
          </button>
        </div>
      </section>
    </>
  );
}

// Wrap in Suspense for Client-Side Rendering
export default function Signin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}

