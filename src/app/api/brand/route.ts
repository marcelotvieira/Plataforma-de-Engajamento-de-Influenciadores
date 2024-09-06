import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// GET - api/brand
export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const take = req.nextUrl.searchParams.get("take") || "14";
    const search = req.nextUrl.searchParams.get("search") || "";
    const brands = await prisma.brand.findMany({
      where: {
        nome: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: (Number(page) - 1) * Number(take),
      take: Number(take),
    });
    return Response.json(brands, { status: 200 });
  } catch (e) {
    console.error('Erro ao obter marca:', process.env.NODE_ENV === "development" && e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json({ message: "Error" }, { status: 404 })
    }
  }
}

// POST - api/brand
export async function POST(request: Request) {
  try {
    const {
      nome,
      descricao,
      nicho,
    } = await request.json();

    const newBrand = await prisma.brand.create({
      data: {
        nome,
        descricao,
        nicho: {
          connect: { id: nicho },
        },
      },
    });

    return Response.json(newBrand, { status: 201, headers: { Location: `/panel/brand/${newBrand.id}` } })
  } catch (e) {
    console.error('Erro ao salvar marca:', process.env.NODE_ENV === "development" && e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json({ message: "Error" }, { status: 404 })
    }
    return Response.json({ message: "Error", details: e }, { status: 422 })
  }
}
