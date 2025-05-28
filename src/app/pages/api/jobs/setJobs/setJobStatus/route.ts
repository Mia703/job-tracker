import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { job_id, job_status } = await request.json();

    if (!job_id || !job_status) {
      return NextResponse.json(
        { message: "setJob: Job id and job status are required" },
        { status: 400 },
      );
    }

    const updateJobStatus = await xata.db.Jobs.update(job_id, {
      job_status: job_status,
    });

    if (!updateJobStatus) {
      return NextResponse.json(
        {message: 'setJob: Unable to update job status'},
        {status: 404}
      )
    }
    return NextResponse.json(
      { message: "setJob: Updated job status" },
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
