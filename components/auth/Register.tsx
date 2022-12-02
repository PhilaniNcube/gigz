import { LockClosedIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { ImageObject } from "../../db_types";
import supabase from "../../utils/supabase";



const Register = () => {

  const router = useRouter();

  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<ImageObject | null>(null);

  const upLoadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Function to Upload an avatar image
  // const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setUploadingImage(true);
  //   console.log({ upLoadPreset });

  //   const { image } = Object.fromEntries(new FormData(e.currentTarget));

  //   console.log(image);

  //   // const fileInput = Array.from(form.elements).find((item) => item.getAttribute('type') === 'file')

  //   const formData = new FormData();

  //   formData.append("file", image);
  //   if (upLoadPreset) {
  //     formData.append("upload_preset", upLoadPreset);
  //   }

  //   const data = await fetch(
  //     `https://api.cloudinary.com/v1_1/dqiefiv0l/image/upload`,
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   )
  //     .then((r) => r.json())
  //     .catch((err) => err.json());
  //   console.log({ data });

  //   setImageData({
  //     url:data.secure_url,
  //     width: data.width,
  //     height: data.height,

  //   });

  //   setUploadingImage(false);
  // };

// functio to register a user
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setLoading(true);



   const { username, phoneNumber, password, email } =
     Object.fromEntries(new FormData(e.currentTarget));

   console.log(typeof username);

   if (
     typeof username != "string" ||
     typeof password != "string" ||
     typeof phoneNumber != "string" ||
     typeof email != "string"
   )
     throw new Error("Please enter valid data");

   let { error, data } = await supabase.auth.signUp({
     password,
     email,
     options: {
       data: {
         username: username,
         phone_number: phoneNumber,

       },
     },
   });

   if (error) {
     alert(`There was an error: ${error.message}`);
     setLoading(false);
   } else if (data.user) {
     alert(`Success, please login.`);
     setLoading(false);
     router.push("/");
   } else {
     alert(`There was an error registering, try again later`);
     setLoading(false);
   }
 };


  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-center text-slate-800 text-2xl md:text-4xl font-bold">
        Register An Account
      </h1>
      <div className="w-full md:w-2/3 mx-auto px-4">
        {/* <form onSubmit={handleImageUpload} className="">
          <div className="flex flex-col w-full mt-10 items-center justify-center bg-white">
            <div>
              {" "}
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-slate-800 rounded-lg shadow-lg tracking-wide uppercase border border-slate-800 cursor-pointer hover:bg-slate-800 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  {imageData ? "" : "Upload Profile Picture"}
                </span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden sr-only"
                />
              </label>
            </div>
            <button
              disabled={!!imageData}
              type="submit"
              className="mt-3 w-64 py-3 border-slate-800 bg-slate-800 text-white border rounded-lg"
            >
              {imageData ? "Saved" : "Save"}
            </button>
          </div>
        </form> */}
      </div>
      <div className="w-full md:w-2/3 mx-auto px-4 mt-10">
        <h2 className="text-slate-800 text-xl font-medium text-center">
          Enter Your Details
        </h2>

        <form
          className="w-full flex flex-col space-y-3 items-center mt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:py-0 py-4">
            <label
              htmlFor="email"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute text-white flex items-center px-4 border-r dark:border-gray-700 h-full bg-slate-800 rounded-l cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x={3} y={5} width={18} height={14} rx={2} />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </div>
              <input
                id="email"
                required
                type="email"
                name="email"
                className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-16 text-sm border-gray-300 rounded border shadow"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute right-0 text-gray-600 dark:text-gray-400 hover:text-gray-700 flex items-center h-full pr-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={12} cy={12} r={2} />
                  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                required
                type="password"
                className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:bg-gray-800 bg-white dark:border-gray-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                placeholder="password"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
              placeholder="Username"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"

            />
          </div>

          <button className="bg-slate-800 py-2 text-white w-64 rounded-lg">{loading ? 'Loading...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
};
export default Register;
