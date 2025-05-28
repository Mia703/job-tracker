import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          message: {
            message: "deleteUser: Email is required",
            type: "error",
          },
        },
        { status: 404 },
      );
    }

    const getUser = await xata.db.Users.filter({ email }).getFirst();

    if (!getUser) {
      return NextResponse.json(
        {
          message: {
            message: `deleteUser: User with email:${email} does not exist`,
            type: "exists",
          },
        },
        { status: 404 },
      );
    }

    const getAllJobs = await xata.db.Jobs.filter({
      "user.id": getUser.id,
    }).getAll();

    if (!getAllJobs) {
      // the user does not have any jobs attached to their account
      // just delete the account

      const deleteUser = await xata.db.Users.delete(getUser.id);

      if (!deleteUser) {
        return NextResponse.json(
          {
            message: {
              message: `deleteUser: Unable to delete user with id:${getUser.id}`,
              type: "error",
            },
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          message: {
            message: "deleteUser: Deleted user from db",
            type: "good",
          },
        },
        { status: 200 },
      );
    } else {
      // move all job ids to string array
      const job_ids_list: string[] = [];
      getAllJobs.forEach((job) => {
        job_ids_list.push(job.id);
      });

      // delete all jobs at once
      const deleteAllJobs = await xata.db.Jobs.delete(job_ids_list);

      if (!deleteAllJobs) {
        return NextResponse.json(
          {
            message: {
              message: `deleteUser: Unable to delete all jobs from user with id:${getUser.id}`,
              type: "error",
            },
          },
          { status: 404 },
        );
      }

      const deleteUser = await xata.db.Users.delete(getUser.id);

      if (!deleteUser) {
        return NextResponse.json(
          {
            message: {
              message: `deleteUser: Unable to delete user with id:${getUser.id}`,
              type: "error",
            },
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          message: {
            message: "deleteUser: Deleted all jobs and user from db",
            type: "good",
          },
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("deleteUser: Internal server error", error);
    return NextResponse.json(
      { message: "deleteUser: Internal server error" },
      { status: 500 },
    );
  }
}
