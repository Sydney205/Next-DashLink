"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useQueryParam } from "@/hooks/useQueryParam";
import Navbar from "@/components/Navbar";
import { FaGithub } from "react-icons/fa";

// Regular Expressions
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{2,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,24}$/;

function AuthForm() {
  const router = useRouter();
  const isLoggingIn = useQueryParam("isLoggingIn", true);

  // State variables
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);


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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      router.push("/dashboard");
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
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) throw new Error(result.error);

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col md:flex-row justify-between items-center md:px-24">
        {!isLoggingIn ? (
          <div className="md:w-[50%] flex flex-col justify-start items-start gap-[2px]">
            <h1 className="font-extrabold mb-8 text-green-600">Begin your journey DashLink</h1>
            <p className="text-xl">Join DashLink today</p>
            <p className="text-xl w-full">Experience the convenience and power of efficient link management.</p>
            <p className="text-xl">{"It's time to make every link count"}</p>
            <p className="text-xl">Sign up now to get started</p>
          </div>
        ) : (
          <div className="md:w-[50%] flex flex-col justify-start items-start gap-[2px]">
            <h1 className="font-extrabold mb-8 text-green-600">Welcome back!</h1>
            <p className="text-xl">Pick up from where you stopped</p>
            <p className="text-xl">Experience the convenience and power of efficient link management.</p>
            <p className="text-xl">{"It's time to make every link count"}</p>
            <p className="text-xl">Signin</p>
          </div>
        )}
        
        <div className="w-full md:w-[30%] flex flex-col justify-start items-start">
          <form
            className="w-full flex flex-col justify-center items-start gap-4"
            onSubmit={isLoggingIn ? handleLogin : handleSignup}
          >
            {!isLoggingIn && (
              <div
                className={
                  !nameFocus && name && !validName
                    ? "w-full transition-all animate_shake"
                    : "w-full transition-all"
                }
              >
                <span
                  className={
                    nameFocus || (name && validName)
                      ? "absolute -mt-4 ml-6 text-lg text-green-600 bg-white dark:bg-stone-950 px-2 transition-all"
                      : !nameFocus && name && !validName // Invalid data
                        ? "absolute -mt-4 ml-6 text-lg text-red-400 bg-white dark:bg-stone-950 px-2 transition-all"
                        : "absolute mt-4 ml-6 text-md text-gray-500 transition-all"
                  }
                >
                  Name
                </span>

                <input
                  className={
                    nameFocus || (name && validName)
                      ? "w-full p-4 border-2 rounded border-green-600 outline-none bg-transparent"
                      : !nameFocus && name && !validName // Invalid data
                        ? "w-full p-4 border-2 rounded border-red-700 outline-none bg-transparent"
                        : "w-full h-full p-4 border-2 rounded border-gray-400 outline-none bg-transparent"
                  }
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => {
                    setNameFocus(true);
                  }}
                  onBlur={() => setNameFocus(false)}
                  aria-invalid={validName ? "false" : "true"}
                  required
                />

                <p
                  className={
                    !nameFocus && name && !validName ? "flex text-red-800" : "hidden"
                  }
                >
                  {"❗ Name too short or long or contains special character"}
                </p>
              </div>
            )}



            <div
              className={
                !emailFocus && email && !validEmail
                  ? "w-full transition-all animate_shake"
                  : "w-full transition-all"
              }
            >
              <span
                className={
                  emailFocus || (email && validEmail)
                    ? "absolute -mt-4 ml-6 text-lg text-green-600 bg-white dark:bg-stone-950 px-2 transition-all"
                    : !emailFocus && email && !validEmail // Invalid data
                      ? "absolute -mt-4 ml-6 text-lg text-red-400 bg-white dark:bg-stone-950 px-2 transition-all"
                      : "absolute mt-4 ml-6 text-md text-gray-500 transition-all"
                }
              >
                Email
              </span>

              <input
                className={
                  emailFocus || (email && validEmail)
                    ? "w-full p-4 border-2 rounded border-green-600 outline-none bg-transparent"
                    : !emailFocus && email && !validEmail // Invalid data
                      ? "w-full p-4 border-2 rounded border-red-700 outline-none bg-transparent"
                      : "w-full h-full p-4 border-2 rounded border-gray-400 outline-none bg-transparent"
                }
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailFocus(true);
                }}
                onBlur={() => setEmailFocus(false)}
                aria-invalid={validEmail ? "false" : "true"}
                required
              />

              <p
                className={
                  !emailFocus && email && !validEmail ? "flex text-red-800" : "hidden"
                }
              >
                {"Invalid email format"}
              </p>
            </div>


            
            {/* Password field */}
            <div
              className={
                !passwordFocus && password && !validPassword
                  ? "w-full transition-all animate_shake"
                  : "w-full transition-all"
              }
            >
              <span
                className={
                  passwordFocus || (password && validPassword)
                    ? "absolute -mt-4 ml-6 text-lg text-green-600 bg-white dark:bg-stone-950 px-2 transition-all"
                    : !passwordFocus && password && !validPassword // Invalid data
                      ? "absolute -mt-4 ml-6 text-lg text-red-400 bg-white dark:bg-stone-950 px-2 transition-all"
                      : "absolute mt-4 ml-6 text-md text-gray-500 transition-all"
                }
              >
                Password
              </span>

              <input
                className={
                  passwordFocus || (password && validPassword)
                    ? "w-full p-4 border-2 rounded border-green-600 outline-none bg-transparent"
                    : !passwordFocus && password && !validPassword // Invalid data
                      ? "w-full p-4 border-2 rounded border-red-700 outline-none bg-transparent"
                      : "w-full h-full p-4 border-2 rounded border-gray-400 outline-none bg-transparent"
                }
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordFocus(true);
                }}
                onBlur={() => setPasswordFocus(false)}
                aria-invalid={validPassword ? "false" : "true"}
                required
              />

              <p
                className={
                  !passwordFocus && password && !validPassword ? "flex text-red-800" : "hidden"
                }
              >
                {"Invalid password format"}
              </p>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full primary-green-btn"
            >
              {loading ? "Processing..." : isLoggingIn ? "Login" : "Sign Up"}
            </button>

            <div className="flex flex-col w-full mt-4">
              <button
                type="button"
                onClick={() => signIn("github")}
                className="w-full bg-gray-800 text-white hover:bg-gray-900 mt-2"
              >
                <FaGithub /> Sign in with GitHub
              </button>
            </div>
          </form>

          <div className="flex justify-center items-center gap-2 mt-6">
            <p>{isLoggingIn ? "Don't have an account?" : "Already have an account?"}</p>
            <a href="#" onClick={switchAccountState} className="text-green-500 hover:underline">
              {isLoggingIn ? "Sign up" : "Login"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Signin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}

