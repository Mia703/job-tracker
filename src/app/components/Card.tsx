import React, { useState } from "react";
import { Job as JobType } from "../types/Job";
import { Modal } from "./Modal";
import { useDraggable } from "@dnd-kit/core";

interface JobCardProps {
  job: JobType;
  user_id: string;
}

export const Card: React.FC<JobCardProps> = ({ job, user_id }) => {
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
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="job-card-wrapper my-2 rounded-sm border-2 bg-white p-2"
      style={style}
      // FIXME: how do I toggle the modal to open, it think every time I click it's considered a drag event
      onClick={() => {
        setDisplayModal(true);
        console.log('set modal true')
      }}
    >
      <div className="job-card">
        <h3 className="font-semibold capitalize">{job.job_name}</h3>
        <small>{job.job_company}</small>
      </div>

      {displayModal && (
        <Modal
          job={job}
          user_id={user_id}
          onClose={() => setDisplayModal(false)}
        />
      )}
    </div>
  );
};
