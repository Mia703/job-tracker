import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { user_id } = await request.json();

    if (!user_id) {
      return NextResponse.json(
        { message: { message: "getJobs: User id is required" } },
        { status: 400 },
      );
    }

    const jobs = await xata.db.Jobs.filter({
      "user.id": user_id,
    })
      .sort("xata.createdAt", "desc") // newest to oldest
      .getAll();

    if (!jobs) {
      return NextResponse.json(
        {
          message: {
            message: `getJobs: Could not get jobs for user_id:${user_id}`,
          },
        },
        { status: 404 },
      );
    } else if (jobs.length == 0) {
      return NextResponse.json(
        {
          message: {
            message: `getJobs: No jobs for user_id:${user_id}`,
          },
          jobs: "",
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: {
            message: `getJobs: Got jobs for user_id: ${user_id} is successful`,
            jobs: JSON.stringify(jobs),
          },
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("getJobs: Internal server error", error);
    return NextResponse.json(
      { message: { message: "getJobs: Internal server error" } },
      { status: 500 },
    );
  }
}
