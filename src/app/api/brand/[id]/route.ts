import { prisma } from "@/services/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextRequest } from "next/server";

// GET - /api/brand/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const brand = await prisma.brand.findFirstOrThrow({
      where: { id: params.id },
      include: { nicho: true, influencers: true }
    })
    return Response.json(brand, { status: 200 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Erro ao obter marca:', process.env.NODE_ENV === "development" && e);
      return Response.json({ message: "Error" }, { status: 404 })
    }
    return Response.json({ message: "Error", details: e }, { status: 500 })
  }
}

// PUT - api/brand/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await req.json();
    const existingBrand = await prisma.brand.findUnique({ where: { id: id } });

    if (!existingBrand) {
      return Response.json({
        message: "Error",
        details: "Marca não encontrada",
      }, { status: 404 });
    }

    console.log(data.influencers)
    const updatedBrand = await prisma.brand.update({
      where: { id: id },
      data: {
        ...data,
        nicho: data.nicho ? { connect: { id: data.nicho } } : undefined,
        influencers: data.influencers
          ? {
            set: data.influencers.map((id: string) => ({ id })),
          }
          : undefined,
      },
    });

    return Response.json(updatedBrand, {
      status: 200,
      headers: { Location: `/panel/brand/${updatedBrand.id}` }
    });
  } catch (e) {
    console.error('Erro ao salvar marca:', process.env.NODE_ENV === "development" && e);
    if (e instanceof PrismaClientValidationError) {
      return Response.json({ message: "Error", details: e.message }, { status: 422 });
    }
    return Response.json({ message: "Error", details: e }, { status: 422 });
  }
}


