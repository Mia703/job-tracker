import { Job as JobType } from "../types/Job";

export async function getJobsByUser(user_id: string) {
  const response = await fetch("/pages/api/jobs/getJobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.message.jobs;
  }
  return null;
}

export async function updateJobStatus(job_id: string, job_status: string) {
  const response = await fetch("/pages/api/jobs/setJobs/setJobStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_id,
      job_status,
    }),
  });

  // if the response is NOT okay, return the error message
  if (!response.ok) {
    const data = await response.json();
    return data.message;
  }
  // else, return nothing
  return null;
}

export async function updateJob(job: JobType) {}

export async function createJob(job: JobType) {}

export async function deleteJob(job_id: string, user_id: string) {}
