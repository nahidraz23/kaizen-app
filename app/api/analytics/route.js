import { NextResponse } from "next/server"
import { getTaskStats } from "@/lib/db"
import { getAuthenticatedUser } from "@/lib/auth-helpers"

export async function GET(request) {
  try {
    // Get the authenticated user
    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = user.id

    const stats = await getTaskStats(userId)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
