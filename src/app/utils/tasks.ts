
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