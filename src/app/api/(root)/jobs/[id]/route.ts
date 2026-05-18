import { auth } from "@/actions/authConfig";
import { getAnalysisById } from "@/lib/analysis";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const result = await getAnalysisById(userId, id);

  if (!result) {
    return NextResponse.json(
      {
        message: "Analysis report not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(result, { status: 200 });
}
