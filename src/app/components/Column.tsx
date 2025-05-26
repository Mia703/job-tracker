import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getJobsByStatus } from "../utils/tasks";
import { Job as JobType } from "../types/Job";
import { Card as JobCard } from "./Card";

interface ColumnProps {
  user_id: string;
  title: string;
  slug: string;
}

export const Column: React.FC<ColumnProps> = ({ user_id, title, slug }) => {
  const [jobsList, setJobsList] = useState<JobType[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getJobsByStatus(user_id, slug);

      if (data) {
        const jobs = JSON.parse(data) as JobType[];
        setJobsList(jobs);
      }
    }
    fetchTasks();
  }, [slug, user_id]);

  return (
    <div className="column col-span-4 md:col-span-1 w-full rounded-md border-2 bg-white p-2 shadow-md">
      <div className="col-header">
        <div className="content-wrapper text-center">
          <h2 className="col-header font-bold capitalize">{title}</h2>
          <small className="totals"># Jobs</small>
        </div>
        <div className="button-wrapper">
          <Button className="my-2 w-full">
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {jobsList ? (
        <div className="col-body card-wrapper">
          {jobsList.map((job, index) => {
            return <JobCard job={job} user_id={user_id} key={index}/>;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
