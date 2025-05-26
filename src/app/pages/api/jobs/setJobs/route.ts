import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const {
      id,
      status,
      userID,
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
    } = await request.json();

    if (
      !id ||
      !status ||
      !userID ||
      !name ||
      !company ||
      !salary ||
      !location ||
      !postURL ||
      !desc ||
      !appDate ||
      !interviewDate ||
      !offerReceivedDate ||
      !offerAcceptedDate
    ) {
      return NextResponse.json(
        { message: "setJobs: All properties are required" },
        { status: 400 },
      );
    }

    const getJob = await xata.db.Jobs.filter({
      id,
      "user.id": userID,
    }).getFirst();

    if (!getJob) {
      return NextResponse.json(
        {
          message: `setJob: The selected job of id:${id} for user:${userID} does not exist.`,
        },
        { status: 404 },
      );
    }

    const setJob = await getJob.update({
      job_status: status,
      job_name: name,
      job_company: company,
      job_salary: salary,
      job_location: location,
      job_post_url: postURL,
      job_desc: desc,
      job_application_date: appDate,
      job_interview_date: interviewDate,
      job_offer_received_date: offerReceivedDate,
      job_offer_accepted_date: offerAcceptedDate,
    });

    if (!setJob) {
      return NextResponse.json(
        {
          message: `setJob: Unable to update the job of id:${id} for user${userID}`,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: `setJob: Updated job of id:${id} for user:${userID}`,
          job: JSON.stringify(setJob),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("setJobs: Internal server error", error);
    return NextResponse.json(
      { message: "setJobs: Internal server error" },
      { status: 500 },
    );
  }
}
