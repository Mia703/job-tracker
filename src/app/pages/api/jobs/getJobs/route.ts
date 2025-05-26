import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { user_id, status } = await request.json();

    if (!user_id || !status) {
      return NextResponse.json(
        { message: { message: "getJobs: User id and status are required" } },
        { status: 400 },
      );
    }

    const jobs = await xata.db.Jobs.filter({
      "user.id": user_id,
      job_status: status,
    }).getAll();

    if (!jobs) {
      return NextResponse.json(
        {
          message: {
            message: `getJobs: Could not get jobs with the status:${status} for user_id:${user_id}`,
          },
        },
        { status: 404 },
      );
    } else if (jobs.length == 0) {
      return NextResponse.json(
        {
          message: {
            message: `getJobs: No jobs with status:${status} for user_id:${user_id}`,
          },
          jobs: "",
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: {
            message: `getJobs: Jobs with status: ${status} for user_id: ${user_id} is successful`,
            jobs: JSON.stringify(jobs),
          },
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("jobs: Internal server error", error);
    return NextResponse.json(
      { message: { message: "getJobs: Internal server error" } },
      { status: 500 },
    );
  }
}
