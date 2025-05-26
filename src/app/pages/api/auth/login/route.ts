import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: { message: "login: Email is required", type: "error" } },
        { status: 400 },
      );
    }

    const user = await xata.db.Users.filter({ email }).getFirst();

    if (!user) {
      return NextResponse.json(
        {
          message: { message: "login: User does not exist", type: "not exist" },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: "Getting user successful",
          type: "",
          user: JSON.stringify(user),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("login: Internal server error", error);
    return NextResponse.json(
      { message: { message: "login: Internal server error", type: "error" } },
      { status: 500 },
    );
  }
}
