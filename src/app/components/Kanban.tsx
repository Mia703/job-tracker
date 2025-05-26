import React from "react";
import { User } from "../types/User";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { Column } from "./Column";
import { DndContext } from "@dnd-kit/core";

interface KanbanProps {
  user: User;
}

export const Kanban: React.FC<KanbanProps> = ({ user }) => {
  const { setUser } = useUser();
  const router = useRouter();

  return (
    <div id="kanban" className="p-4">
      <div className="top-wrapper my-2 flex w-full flex-row items-end justify-between">
        <h1>Hi, {user.firstName}</h1>
        <Button
          onClick={() => {
            window.sessionStorage.removeItem("user");
            setUser(null);
            router.push("/");
          }}
        >
          Logout <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="bottom-wrapper my-2 mt-6 w-full">
        <DndContext>
          <div className="columns-wrapper grid grid-cols-4 gap-2">
            <Column key={1} user_id={user.id} title="Wish List" slug="wish-list" />
            <Column key={2} user_id={user.id} title="Applied" slug="applied" />
            <Column key={3} user_id={user.id} title="Rejected" slug="rejected" />
            <Column key={4} user_id={user.id} title="Offered" slug="offered" />
          </div>
        </DndContext>
      </div>
    </div>
  );
};
