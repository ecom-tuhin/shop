import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

//internal import

import {notifyError, notifySuccess} from "@utils/toast";
import CustomerServices from "@services/CustomerServices";

const useSignupSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const redirectUrl = useSearchParams().get("redirectUrl");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    console.log(name);
    const handleRegisterCustomer = async () => {
      try {
        const res = CustomerServices.registerCustomer({name, email, password});
        console.log(res)
        //router.push("/");
        // setLoading(false);
        // setSuccess(res.message);
        notifySuccess("Register Success!");
      } catch (error) {
        setLoading(false);
        console.log(error)
        // setError(err ? err.response.data.message : err.message);
      }
    };
    await handleRegisterCustomer();

    const result = await signIn("credentials", {
      redirect: false, // Changed to false to handle redirection manually
      email,
      password,
      callbackUrl: "/user/dashboard",
    });

    // console.log("result", result, "redirectUrl", redirectUrl);

    if (result?.error) {
      notifyError(result?.error);
      console.error("Error during sign-in:", result.error);
      // Handle error display here
    } else if (result?.ok) {
      const url = redirectUrl ? "/checkout" : result.url;
      router.push(url);
    }
  };

  return {
    register,
    errors,
    loading,
    handleSubmit,
    submitHandler,
  };
};

export default useSignupSubmit;
