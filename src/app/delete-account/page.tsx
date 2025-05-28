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
        <Alert variant={"destructive"} className="text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was a problem deleting your account. Please try again.
          </AlertDescription>
        </Alert>
      );
    case "exists":
      return (
        <Alert variant={"destructive"} className="text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            An account with this email does not exist. Please try signing up.
          </AlertDescription>
        </Alert>
      );
    case "good":
      return (
        <Alert className="border-green-600 text-left text-green-600">
          <Check className="h-4 w-4" />
          <AlertDescription className="text-green-600">
            Your account has been deleted.
          </AlertDescription>
        </Alert>
      );
    default:
      return <div></div>;
  }
}

export default function DeleteAccount() {
  const [alert, setAlert] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      if (values.email === " ") {
        setAlert("default");
      } else {
        const response = await fetch("/pages/api/auth/deleteUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="" method="post" onSubmit={formik.handleSubmit}>
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
              <Button
                type="submit"
                variant={"destructive"}
                className="my-4 w-full"
              >
                Delete Account
              </Button>
            </form>

            {alertType(alert)}
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <small>
                Already have an account? <Link href={"/"}>Login</Link>{" "}
              </small>
              <br />
              <small>
                Don&apos;t have an account?{" "}
                <Link href={"/signup"}>Sign Up</Link>
              </small>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
