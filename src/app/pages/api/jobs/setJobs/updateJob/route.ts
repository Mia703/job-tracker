import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const {
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
    } = await request.json();

    // !id will return true if the string is empty ('')
    // some job card inputs may or may not be empty
    // therefore, only check for null or undefined
    if (
      id == null ||
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
            message: `updateJob: All properties are required`,
            type: "error",
          },
        },
        { status: 404 },
      );
    }

    const updateJob = await xata.db.Jobs.update(id, {
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

    if (!updateJob) {
      return NextResponse.json(
        {
          message: {
            message: `updateJob: Unable to update job of id:${id}`,
            type: "error",
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: `updateJob: Successfully updated job of id:${id}`,
          type: "updated",
          job: JSON.stringify(updateJob),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("updateJob: Internal server error", error);
    return NextResponse.json(
      {
        message: { message: "updateJob: Internal server error", type: "error" },
      },
      { status: 500 },
    );
  }
}
