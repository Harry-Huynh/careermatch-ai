import { auth } from "@/actions/authConfig";
import { getReports } from "@/lib/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;

  const query = searchParams.get("query") || undefined;
  const company = searchParams.get("company") || undefined;
  const minFitScore = searchParams.get("minFitScore")
    ? parseInt(searchParams.get("minFitScore")!)
    : 0;
  const maxFitScore = searchParams.get("maxFitScore")
    ? parseInt(searchParams.get("maxFitScore")!)
    : 100;

  const userId = session.user.id;

  try {
    const reports = await getReports({
      userId,
      query,
      company,
      minFitScore,
      maxFitScore,
    });

    return NextResponse.json(reports, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error fetching reports" },
      { status: 500 },
    );
  }
}
