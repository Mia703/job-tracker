export async function getJobsByStatus(user_id: string, status: string) {
  const response = await fetch("/pages/api/jobs/getJobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      status,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.message.jobs;
  }
  return null;
}

export async function setJobsByStatus(
  id: string,
  userID: string,
  status: string,
  name: string,
  company: string,
  salary: string,
  location: string,
  postURL: string,
  desc: string,
  appDate: string,
  interviewDate: string,
  offerReceivedDate: string,
  offerAcceptedDate: string,
) {
  const response = await fetch("/pages/api/jobs/setJobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      userID,
      status,
      name,
      company,
      salary,
      location,
      postURL,
      desc,
      appDate,
      interviewDate,
      offerReceivedDate,
      offerAcceptedDate,
    }),
  });

  const data = await response.json();
  console.log("data", data);
}
