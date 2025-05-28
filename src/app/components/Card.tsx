import React, { useState } from "react";
import { Job as JobType } from "../types/Job";
import { Modal } from "./Modal";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

interface JobCardProps {
  job: JobType;
  user_id: string;
  upsertJob: (job: JobType, type: string) => void;
}

export const Card: React.FC<JobCardProps> = ({ job, user_id, upsertJob }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="job-card-wrapper my-2 rounded-sm border-2 border-slate-300 bg-white p-4"
      style={style}
    >
      <div
        className="job-card cursor-pointer"
        onClick={() => {
          setDisplayModal(!displayModal);
        }}
      >
        <div
          className="grip-wrapper float-right"
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-4 w-4 cursor-grab" />
        </div>
        <h3 className="font-semibold capitalize">{job.job_name}</h3>
        <small>{job.job_company}</small>
      </div>

      {displayModal && (
        <Modal
          job={job}
          status={job.job_status}
          user_id={user_id}
          onClose={() => setDisplayModal(!displayModal)}
          upsertJob={upsertJob}
        />
      )}
    </div>
  );
};
