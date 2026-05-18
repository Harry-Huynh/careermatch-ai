import { auth } from "@/actions/authConfig";
import { getDashboardData } from "@/lib/dashboard";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const result = await getDashboardData(userId);

  if (!result) {
    return NextResponse.json(
      { message: "Dashboard data not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(result, { status: 200 });
}
