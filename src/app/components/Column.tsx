import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Card as JobCard } from "./Card";
import { Modal } from "./Modal";
import { Job as JobType } from "../types/Job";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  user_id: string;
  title: string;
  slug: string;
  jobs: JobType[];
  upsertJob: (job: JobType, type: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  user_id,
  title,
  slug,
  jobs,
  upsertJob,
}) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const { setNodeRef } = useDroppable({
    id: slug,
  });

  return (
    <div
      ref={setNodeRef}
      className="column col-span-4 w-full rounded-md border-2 bg-white p-2 shadow-md md:col-span-1"
    >
      <div className="col-header sticky top-0 border-b-2 border-slate-400 bg-white p-2">
        <div className="content-wrapper text-center">
          <h2 className="col-header font-bold capitalize">{title}</h2>
          <small className="totals">{jobs.length} Jobs</small>
        </div>
        <div className="button-wrapper">
          <Button
            className="my-2 w-full"
            onClick={() => {
              setDisplayModal(!displayModal);
            }}
          >
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      <div className="col-body card-wrapper p-1">
        {jobs.map((job, index) => {
          return (
            <JobCard
              job={job}
              user_id={user_id}
              key={index}
              upsertJob={upsertJob}
            />
          );
        })}
      </div>

      {displayModal && (
        <Modal
          job={null}
          status={slug}
          user_id={user_id}
          onClose={() => setDisplayModal(!displayModal)}
          upsertJob={upsertJob}
        />
      )}
    </div>
  );
};
