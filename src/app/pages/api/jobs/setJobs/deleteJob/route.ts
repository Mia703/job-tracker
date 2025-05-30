import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();
export async function POST(request: Request) {
  try {
    const { job_id } = await request.json();

    if (!job_id) {
      return NextResponse.json(
        {
          message: {
            message: "deleteJob: Job id is required",
            type: "delError",
          },
        },
        { status: 404 },
      );
    }

    const deleteJob = await xata.db.Jobs.delete(job_id);

    if (!deleteJob) {
      return NextResponse.json(
        {
          message: {
            message: `deleteJob: Unable to delete job of id:${job_id}`,
            type: "delError",
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: `deleteJob: Deleted job of id:${job_id}`,
          type: "good",
          job: JSON.stringify(deleteJob),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("deleteJob: Internal server error", error);
    return NextResponse.json(
      {
        message: {
          message: "deleteJob: Internal server error",
          type: "delError",
        },
      },
      { status: 500 },
    );
  }
}
