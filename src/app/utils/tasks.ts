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

export async function updateJob(
  id: string,
  job_status: string,
  job_name: string,
  job_company: string,
  job_salary: string,
  job_location: string,
  job_post_url: string,
  job_desc: string,
  job_application_date: string,
  job_interview_date: string,
  job_offer_received_date: string,
  job_offer_accepted_date: string,
) {
  const response = await fetch("/pages/api/jobs/setJobs/updateJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      job_status,
      job_name,
      job_company,
      job_salary,
      job_location,
      job_post_url,
      job_desc,
      job_application_date,
      job_interview_date,
      job_offer_received_date,
      job_offer_accepted_date,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  }
  console.error("updateJob", data.message.message);
  return null;
}

export async function createJob(
  user_id: string,
  job_status: string,
  job_name: string,
  job_company: string,
  job_salary: string,
  job_location: string,
  job_post_url: string,
  job_desc: string,
  job_application_date: string,
  job_interview_date: string,
  job_offer_received_date: string,
  job_offer_accepted_date: string,
) {
  const response = await fetch("/pages/api/jobs/setJobs/createJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      job_status,
      job_name,
      job_company,
      job_salary,
      job_location,
      job_post_url,
      job_desc,
      job_application_date,
      job_interview_date,
      job_offer_received_date,
      job_offer_accepted_date,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  }
  console.error("createJob", data.message.message);
  return null;
}

export async function deleteJob(job_id: string) {
  const response = await fetch("/pages/api/jobs/setJobs/deleteJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_id,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  }
  console.error("deleteJob", data.message.message);
  return null;
}
