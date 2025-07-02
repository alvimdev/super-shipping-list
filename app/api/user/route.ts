import { getAuthenticatedUser } from "@/src/lib/auth";
import { userOutputSchema } from "@/src/schemas/user";
import {
  modifyUser,
  registerUser,
  removeUser,
} from "@/src/services/userService";
import { generateToken } from "@/src/utils/jwt";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await registerUser(data);
    const token = generateToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ success: true }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 3, // 3 dias em segundos
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err: Error | any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const parsedUser = userOutputSchema.parse(user);
    return Response.json(parsedUser, { status: 200 });
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const data = await request.json();
    const updatedUser = await modifyUser(user.id, data);
    const parsedUser = userOutputSchema.parse(updatedUser);
    return Response.json(parsedUser, { status: 200 });
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const user = await getAuthenticatedUser();
    await removeUser(user.id);
    return Response.json({ success: true }, { status: 200 });
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
