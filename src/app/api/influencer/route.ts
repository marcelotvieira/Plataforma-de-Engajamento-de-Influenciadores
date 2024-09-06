import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// GET - api/influencer
export async function GET(req: NextRequest) {
  try {
    const asOption = req.nextUrl.searchParams.get("asOption" || "0")
    const page = req.nextUrl.searchParams.get("page") || "1";
    const take = req.nextUrl.searchParams.get("take") || "14";
    const search = req.nextUrl.searchParams.get("search") || "";
    const minAlcance = req.nextUrl.searchParams.get("minAlcance") || undefined;
    const maxAlcance = req.nextUrl.searchParams.get("maxAlcance") || undefined;
    const nicho = req.nextUrl.searchParams.get("nicho") || undefined;
    const influencers = await prisma.influencer.findMany({
      select: asOption === "1" ? { id: true, nome: true } : undefined,
      where: {
        nicho: { id: nicho },
        OR: [
          {
            nome: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            usernameInstagram: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        alcance: {
          gte: minAlcance ? Number(minAlcance) : undefined,
          lte: maxAlcance ? Number(maxAlcance) : undefined,
        },
      },
      skip: (Number(page) - 1) * Number(take),
      take: Number(take),
    });
    return Response.json(influencers, { status: 200 })
  } catch (e) {
    console.error('Erro ao obter influenciador:', process.env.NODE_ENV === "development" && e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json({ message: "Error" }, { status: 404 })
    }
    return Response.json({ message: "Error", details: e }, { status: 500 })
  }
}


// POST - api/influencer
export async function POST(request: Request) {
  try {
    const {
      nome,
      nicho,
      email,
      alcance,
      following,
      usernameInstagram,
      logradouro,
      unidade,
      bairro,
      localidade,
      uf,
      cep,
      foto,
    } = await request.json();
    const newInfluencer = await prisma.influencer.create({
      data: {
        nome,
        email,
        nicho: {
          connect: { id: nicho },
        },
        alcance: Number(alcance),
        following: Number(following),
        usernameInstagram,
        foto,
        endereco: {
          create: {
            logradouro,
            unidade,
            bairro,
            localidade,
            uf,
            cep,
          },
        },
      },
    });
    return Response.json(newInfluencer, {
      status: 201,
      headers: { Location: `/panel/influencers/${newInfluencer.id}` }
    })

  } catch (e) {
    console.error('Erro ao salvar influenciador:', process.env.NODE_ENV === "development" && e);
    if (e instanceof PrismaClientValidationError) {
      return Response.json({ message: "Error", details: e.message }, { status: 422 })
    }
    return Response.json({ message: "Error", details: e }, { status: 422 })
  }
}
