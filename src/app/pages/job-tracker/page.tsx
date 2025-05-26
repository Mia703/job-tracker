"use client";
import { Kanban } from "@/app/components/Kanban";
import { useUser } from "@/app/context/UserContext";
import { User } from "@/app/types/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function JobTracker() {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const user_data = window.sessionStorage.getItem("user");

    if (user_data) {
      const user = JSON.parse(user_data) as User;
      setUser(user);
    }
    else {
      setUser(null);
    }
  }, [setUser]);

  return (
    <>
      {user ? (
        <Kanban user={user} />
      ) : (
        <div className="flex h-dvh w-full flex-col content-center items-center justify-center p-4">
          <div className="w-full text-center md:w-1/2 lg:w-1/3">
            <Card>
              <CardContent>
                <p>It seems like you&apos;re not logged in.</p>
                <Button
                  className="my-4 w-full"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Back to Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
