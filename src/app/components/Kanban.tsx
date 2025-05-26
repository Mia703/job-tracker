import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { Column } from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Job as JobType } from "../types/Job";
import { getJobsByUser } from "../utils/tasks";

interface KanbanProps {
  user: User;
}

export const Kanban: React.FC<KanbanProps> = ({ user }) => {
  const { setUser } = useUser();
  const [jobsList, setJobsList] = useState<JobType[]>([]);
  const [draggedJob, setDraggedJob] = useState<string>("");
  const router = useRouter();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    // 'active' is the draggable job card
    // saves the id of the dragged card
    const dragged_job_id = active.id as string;
    setDraggedJob(dragged_job_id); // save job id to update db

    // 'over' is the droppable column
    // saves the col slug or 'job_status' the card was dropped over
    const new_job_status = over.id as JobType["job_status"];

    // the update to the list is asynchronous, use useEffect to see changes
    setJobsList(() =>
      jobsList.map((job) =>
        job.id == dragged_job_id ? { ...job, job_status: new_job_status } : job,
      ),
    );
  }

  // every time a job is moved update the db
  useEffect(() => {
    const found = jobsList.find((job) => job.id == draggedJob);
    console.log("dragged job", found)
    // TODO: create fetch function to update db
  }, [draggedJob, jobsList]);

  // gets all jobs related to user id
  useEffect(() => {
    async function fetchAllJobs() {
      const data = await getJobsByUser(user.id);

      if (data) {
        const jobs = JSON.parse(data) as JobType[];
        setJobsList(jobs);
      }
    }
    fetchAllJobs();
  }, [user.id]);

  // filters all jobs based on job status
  const getJobsByStatus = (status: JobType["job_status"]) => {
    return jobsList.filter((job) => job.job_status === status);
  };

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
        <DndContext onDragEnd={handleDragEnd}>
          <div className="columns-wrapper grid grid-cols-4 gap-2">
            <Column
              key={1}
              user_id={user.id}
              title="Wish List"
              slug="wish-list"
              jobs={getJobsByStatus("wish-list")}
            />
            <Column
              key={2}
              user_id={user.id}
              title="Applied"
              slug="applied"
              jobs={getJobsByStatus("applied")}
            />
            <Column
              key={3}
              user_id={user.id}
              title="Rejected"
              slug="rejected"
              jobs={getJobsByStatus("rejected")}
            />
            <Column
              key={4}
              user_id={user.id}
              title="Offered"
              slug="offered"
              jobs={getJobsByStatus("offered")}
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
};
