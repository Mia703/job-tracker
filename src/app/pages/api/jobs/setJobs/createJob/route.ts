import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const {
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
    } = await request.json();

    // !user_id will return true if the string is empty ('')
    // some job card inputs may or may not be empty
    // therefore, only check for null or undefined
    if (
      user_id == null ||
      job_status == null ||
      job_name == null ||
      job_company == null ||
      job_salary == null ||
      job_location == null ||
      job_post_url == null ||
      job_desc == null ||
      job_application_date == null ||
      job_interview_date == null ||
      job_offer_received_date == null ||
      job_offer_accepted_date == null
    ) {
      return NextResponse.json(
        {
          message: {
            message: `createJob: All properties are required`,
            type: "error",
          },
        },
        { status: 404 },
      );
    }

    const createJob = await xata.db.Jobs.create({
      user: user_id,
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
    });

    if (!createJob) {
      return NextResponse.json(
        {
          message: {
            message: `createJob: Unable to create job for user_id:${user_id}`,
            type: "error",
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: `createJob: Created a job for user_id:${user_id}`,
          type: "good",
          job: JSON.stringify(createJob),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("createJob: Internal server error", error);
    return NextResponse.json(
      {
        message: { message: "createJob: Internal server error", type: "error" },
      },
      { status: 500 },
    );
  }
}
