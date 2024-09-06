import { prisma } from "@/services/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
  try {
    const { nome, email, senha } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "Email já cadastrado" }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        nome,
        email,
        senha: bcrypt.hashSync(senha, 10),
      },
    });

    return Response.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return Response.json({ error: "Erro ao registrar usuário" }, { status: 500 });
  }
}
