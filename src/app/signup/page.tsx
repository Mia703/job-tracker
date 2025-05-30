"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { AlertCircle, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function alertType(type: string) {
  switch (type) {
    case "error":
      return (
        <Alert variant={"destructive"} className="border-red-500 text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was a problem signing up. Please try again.
          </AlertDescription>
        </Alert>
      );
    case "exists":
      return (
        <Alert variant={"destructive"} className="text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This email already exists. Try logging in.
          </AlertDescription>
        </Alert>
      );
    case "good":
      return (
        <Alert className="border-green-600 text-left text-green-600">
          <Check className="h-4 w-4" />
          <AlertDescription className="text-green-600">
            Sign up successful. Please login.
          </AlertDescription>
        </Alert>
      );
    default:
      return <div></div>;
  }
}

export default function SignUp() {
  const [alert, setAlert] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (values) => {
      if (
        values.firstName === " " ||
        values.lastName === " " ||
        values.email === " "
      ) {
        setAlert("default");
      } else {
        const response = await fetch("/pages/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          }),
        });

        const data = await response.json();
        setAlert(data.message.type);

        if (response.ok) {
          formik.resetForm();
        } else {
          console.error(data.message.message);
        }
      }
    },
  });

  return (
    <div className="flex h-dvh w-full flex-col content-center items-center justify-center p-6">
      <main className="w-full text-center md:w-1/2 lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="" method="post" onSubmit={formik.handleSubmit}>
              <div className="wrapper grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="mb-2">
                    First Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    placeholder="First Name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    placeholder="Last Name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="email" className="mb-2">
                  Email<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <Button type="submit" className="my-4 w-full">
                Login
              </Button>
            </form>

            {alertType(alert)}
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <small>
                Already have an account? <Link href={"/"}>Login</Link>{" "}
              </small>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
