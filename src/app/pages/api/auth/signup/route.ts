import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          message: {
            message: "signup: First name, last name, and email are required.",
            type: "error",
          },
        },
        { status: 400 },
      );
    }

    const checkUser = await xata.db.Users.filter({ email }).getFirst();

    if (!checkUser) {
      const addUser = await xata.db.Users.create({
        firstName,
        lastName,
        email,
      });

      if (!addUser) {
        return NextResponse.json(
          {
            message: {
              message: "signup: Could not create user",
              type: "error",
            },
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: { message: "signup: Created new user", type: "good" } },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: { message: "signup: User already exists", type: "exists" } },
      { status: 400 },
    );
  } catch (error) {
    console.error("signup: Internal server error.", error);
    return NextResponse.json(
      {
        message: {
          message:
            "signup: Internal server error.",
          type: "error",
        },
      },
      { status: 500 },
    );
  }
}
