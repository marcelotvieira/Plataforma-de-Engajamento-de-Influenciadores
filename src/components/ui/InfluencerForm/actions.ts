"use server"

import { revalidatePath } from 'next/cache'
import getUrl from "@/lib/get-url";
import { InfluencerFormValues } from "./InfluencerForm";
import { redirect } from 'next/navigation';

export async function getCategories() {
  try {
    const response = await fetch(getUrl("/api/influencerCategory"));
    const data = await response.json();
    // mock delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return data.categories;
  } catch (e) {
    console.error('Failed to fetch categories', e);
    return [];
  }
}

export async function registerInfluencer(data: InfluencerFormValues) {
  const response = await fetch(getUrl("/api/influencer"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: data.nome,
      nicho: data.nicho,
      email: data.email,
      alcance: data.alcance,
      usernameInstagram: data.usernameInstagram,
      logradouro: data.logradouro,
      following: data.following,
      unidade: data.unidade,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      cep: data.cep,
      foto: data.foto as string || '',
    }),
  });
  const jsonData = await response.json()
  if (!response.ok) {
    console.log("Error", process.env.NODE_ENV === "development" && jsonData.details)
    throw new Error('Erro ao cadastrar o influencer');
  }
  redirect(`/panel/influencers/${jsonData.id}`)
}

export async function updateInfluencer(id: string, data: InfluencerFormValues) {
  const response = await fetch(getUrl(`/api/influencer/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: data.nome,
      nicho: data.nicho,
      email: data.email,
      alcance: data.alcance,
      usernameInstagram: data.usernameInstagram,
      logradouro: data.logradouro,
      following: data.following,
      unidade: data.unidade,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      cep: data.cep,
      foto: data.foto as string || '',
    }),
  });

  if (!response.ok) {
    console.log((await response.json()).details)
    throw new Error('Erro ao atualizar o influencer');
  }

  revalidatePath(`/panel/influencers/${id}`)
  redirect(`/panel/influencers/${id}`)
}