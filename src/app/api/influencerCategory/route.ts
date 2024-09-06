import { prisma } from "@/services/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchQuery = req.nextUrl.searchParams.get('search');
    const categories = await prisma.influencerCategory.findMany({
      where: {
        nome: searchQuery ? { contains: searchQuery } : undefined,
      },
    });

    return Response.json({ categories }, { status: 200 })
  } catch (e) {
    console.error('Error', process.env.NODE_ENV === "development" && e);
    return Response.json({ message: "Error", details: e }, { status: 500 })
  }
}