import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "")
    .toLowerCase()
    .trim();
  const password = String(body.password ?? "");

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      provider: "CREDENTIALS",
    },
  });

  return NextResponse.json(
    {
      message: "Account created successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    { status: 201 },
  );
}
