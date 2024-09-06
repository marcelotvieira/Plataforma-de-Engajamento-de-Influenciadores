"use server"

import getUrl from "@/lib/get-url";
import { Influencer } from "@prisma/client";


export async function getInfluencer(id: string) {
  try {
    const response = await fetch(getUrl(`/api/influencer/${id}`));
    if (!response.ok) {
      throw new Error('Failed to fetch influencer');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching influencer:', error);
    return null;
  }
}

export async function getInfluencers(page = 1, take = 3, search = '', nicho: string, minAlcance: string, maxAlcance: string) {
  try {
    const url = getUrl(`/api/influencer?page=${page}&take=${take}&search=${search}&nicho=${nicho}&minAlcance=${minAlcance}&maxAlcance=${maxAlcance}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao obter influencers');
    }
    const data = await response.json() as Influencer[];
    await new Promise(resolve => setTimeout(resolve, 100));
    return data;
  } catch (error) {
    console.error('Erro ao obter influencers', error);
    return [];
  }
}

export async function getInfluencersAsOptions(page = 1, take = 3, search = '', nicho: string) {
  try {
    const url = getUrl(`/api/influencer?page=${page}&take=${take}&search=${search}&nicho=${nicho}&asOption=1`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao obter influencers');
    }
    const data = await response.json() as { id: string, nome: string }[];
    await new Promise(resolve => setTimeout(resolve, 100));
    return data;
  } catch (error) {
    console.error('Erro ao obter influencers', error);
    return [];
  }
}