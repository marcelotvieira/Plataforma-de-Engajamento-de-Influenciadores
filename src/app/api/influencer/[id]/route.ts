import { prisma } from "@/services/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextRequest } from "next/server";

// GET - /api/influencer/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const influencer = await prisma.influencer.findFirstOrThrow({
      where: { id: params.id },
      include: { endereco: true, nicho: true }
    })
    return Response.json(influencer, { status: 200 })
  } catch (e) {
    console.error('Erro ao obter influenciador:', process.env.NODE_ENV === "development" && e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json({ message: "Error" }, { status: 404 })
    }
    return Response.json({ message: "Error", details: e }, { status: 500 })
  }
}

// PUT - api/influencer/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const {
      nicho,
      nome,
      email,
      alcance,
      following,
      usernameInstagram,
      foto,
      ...rest
    } = await req.json();

    if (!(await prisma.influencer.findUnique({ where: { id: id } }))) {
      return Response.json({ message: "Error", details: "Influenciador não encontrado" }, { status: 404 });
    }

    const updatedInfluencer = await prisma.influencer.update({
      where: { id: id },
      data: {
        nome,
        email,
        foto,
        usernameInstagram,
        nicho: nicho ? { connect: { id: nicho } } : undefined,
        alcance: alcance ? Number(alcance) : undefined,
        following: following ? Number(following) : undefined,
        endereco: { update: rest },
      },
    });
    return Response.json(updatedInfluencer, {
      status: 200,
      headers: {
        Location: `/panel/influencers/${updatedInfluencer.id}`
      }
    });

  } catch (error) {
    console.error('Erro ao salvar influenciador:', process.env.NODE_ENV === "development" && error);
    if (error instanceof PrismaClientValidationError) {
      return Response.json({ message: "Error", details: error.message }, { status: 422 });
    }
    return Response.json({ message: "Error", details: error }, { status: 422 });
  }
}
