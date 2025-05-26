"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function alertType(type: string) {
  switch (type) {
    case "error":
      return (
        <Alert variant={"destructive"} className="text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was a problem logging in. Please try again.
          </AlertDescription>
        </Alert>
      );
    case "not exist":
      return (
        <Alert variant={"destructive"} className="text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            An account with this email does not exist. Try signing up.
          </AlertDescription>
        </Alert>
      );
    default:
      return <div></div>;
  }
}

export default function Home() {
  const [alert, setAlert] = useState<string>("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      if (values.email == "") {
        setAlert("error");
      } else {
        const response = await fetch("/pages/api/auth/login", {
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

          // save the user's data
          window.sessionStorage.setItem("user", data.message.user);

          router.push("/pages/job-tracker");
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
            <CardTitle>Login</CardTitle>
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
              <Button type="submit" className="my-6 w-full">
                Login
              </Button>
            </form>

            {alertType(alert)}
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <small>
                Don&apos;t have an account?{" "}
                <Link href={"/signup"}>Sign Up</Link>{" "}
              </small>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
