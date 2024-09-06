"use server"

import getUrl from "@/lib/get-url";
import { Brand } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getBrand(id: string) {
  try {
    const response = await fetch(getUrl(`/api/brand/${id}`));
    if (!response.ok) {
      throw new Error('Failed to fetch brand');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    return null;
  }
}

export async function getBrands(page = 1, take = 3, search = '', nicho: string) {
  try {
    const url = getUrl(`/api/brand?page=${page}&take=${take}&search=${search}&nicho=${nicho}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao obter brands');
    }
    const data = await response.json() as Brand[];
    await new Promise(resolve => setTimeout(resolve, 100));
    return data;
  } catch (error) {
    console.error('Erro ao obter brands', error);
    return [];
  }
}

export async function updateBrandInfluencers(brandId: string, influencers: string[]) {
  try {
    const response = await fetch(getUrl(`/api/brand/${brandId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ influencers }),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar');
    }
    revalidatePath(`/panel/brands/${brandId}`)
  } catch (error) {
    console.error('Error updating brand influencers:', process.env.NODE_ENV === "development" && error);
    return;
  }
}


