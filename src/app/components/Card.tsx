import React, { useState } from "react";
import { Job as JobType } from "../types/Job";
import { Modal } from "./Modal";

interface JobCardProps {
  job: JobType;
  user_id: string;
}

export const Card: React.FC<JobCardProps> = ({ job, user_id }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  return (
    <div>
      <div
        className="job-card my-2 cursor-pointer rounded-sm border-2 p-2"
        onClick={() => {
          setDisplayModal(true);
        }}
      >
        <h3 className="font-semibold capitalize">{job.job_name}</h3>
        <small>{job.job_company}</small>
      </div>

      {displayModal && (
        <Modal job={job} user_id={user_id} onClose={() => setDisplayModal(false)} />
      )}
    </div>
  );
};
