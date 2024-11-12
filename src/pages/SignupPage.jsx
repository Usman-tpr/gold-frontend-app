import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Select from "react-select"; // Import react-select
import { handleEnterSubmit } from "../constant";
import { postRequest } from "../Requests/Request"; // Assuming you have a postRequest and getRequest methods

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Location options for react-select
  const locationOptions = [
    { value: "new-york", label: "New York" },
    { value: "san-francisco", label: "San Francisco" },
    { value: "los-angeles", label: "Los Angeles" },
  ];

  // for password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{11}$/; // Adjust phone validation as needed
    if (name === "" || phone === "" || password === "" || !location) {
      toast.error("Please Fill All the Fields ...");
    } else if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
    } else {
      setLoading(true);
      try {
        const response = await postRequest("/user/register", {
          name,
          phone,
          password,
          location: location.value,
        });
        localStorage.setItem("Gold_token", response?.token);
      console.log(response)
      console.log(response?.token)
        // After successful registration, fetch the user details using the token


        setLoading(false);
        setMessage(response?.message || "Registration successful");
        toast.success(response?.message || "Registration successful");
        navigate("/"); // Redirect after successful signup
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || "Something went wrong");
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };


  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center px-4 md:px-0 bg-[#FFFAF4]">
        <div
          className="w-full md:w-fit p-4 md:p-10 bg-white flex flex-col items-center rounded-3xl"
          style={{ boxShadow: "0px 5px 30px 0px #00000008" }}
        >
          <img
            className="mx-auto h-14 w-14"
            src="/assets/images/netchain-logo.svg"
            alt=""
          />
          <div className="font-bold tracking-wide text-xl md:text-2xl mt-5 mb-2 text-center">
            Register Your Account
          </div>
          <form
            onKeyDown={(e) => handleEnterSubmit(e, handleSignup)}
            className="w-full"
          >
            <div className="w-full md:w-[30rem] mt-4">
              {/* Name */}
              <label className="form-control">
                <div className="label">
                  <span className="text-xs md:text-base font-bold tracking-wide">
                    Enter Your Name
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="p-3 md:p-3 rounded-lg text-sm border border-[#EBF0ED] bg-[#FAFAFA] w-full focus:outline-none focus:border-[#EBF0ED]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              {/* Phone */}
              <label className="form-control mt-4">
                <div className="label">
                  <span className="text-xs md:text-base font-bold tracking-wide">
                    Enter Your Phone Number
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="1234567890"
                  className="p-3 md:p-3 rounded-lg text-sm border border-[#EBF0ED] bg-[#FAFAFA] w-full focus:outline-none focus:border-[#EBF0ED]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              {/* Password */}
              <label className="form-control mt-4">
                <div className="label">
                  <span className="text-xs md:text-base font-bold tracking-wide">
                    Enter Your Password
                  </span>
                </div>
                <span className="flex items-center relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="********"
                    className="p-3 md:p-3 rounded-lg text-sm border border-[#EBF0ED] bg-[#FAFAFA] w-full focus:outline-none focus:border-[#EBF0ED]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordVisible ? (
                    <IoEyeOutline
                      className="absolute right-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <IoEyeOffOutline
                      className="absolute right-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </span>
              </label>

              {/* Location */}
              <label className="form-control mt-4">
                <div className="label">
                  <span className="text-xs md:text-base font-bold tracking-wide">
                    Select Your Location
                  </span>
                </div>
                <Select
                  value={location}
                  onChange={setLocation}
                  options={locationOptions}
                  className="text-sm"
                  placeholder="Choose your location"
                />
              </label>

              {/* Submit Button */}
              <button
                onClick={handleSignup}
                disabled={loading}
                className="bg-yellow-500 hover:bg-opacity-90 h-12 duration-200 w-full rounded-lg py-3 mt-[1rem] text-white font-bold tracking-wider"
              >
                {!loading ? (
                  "Register My Account"
                ) : (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </button>

              <div className="mt-3 flex justify-center items-center gap-1">
                <span className="font-[400] text-sm">
                  Already have an account?
                </span>
                <Link to="/" className="text-usetheme text-[15px] font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
