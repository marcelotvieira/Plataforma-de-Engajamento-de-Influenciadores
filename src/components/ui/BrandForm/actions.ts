"use server"
import getUrl from "@/lib/get-url";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerBrand(data: FormData) {
  const objData = Object.fromEntries(data.entries())
  const response = await fetch(getUrl("/api/brand"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objData)
  })

  const jsonData = await response.json()
  if (!response.ok) {
    console.log("Error", process.env.NODE_ENV === "development" && jsonData.details)
    throw new Error('Erro ao cadastrar a marca');
  }
  redirect(`/panel/brands/${jsonData.id}`)
}

export async function updateBrand(id: string, data: FormData) {
  const objData = Object.fromEntries(data.entries())
  const response = await fetch(getUrl(`/api/brand/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objData)
  })
  if (!response.ok) {
    if (process.env.NODE_ENV === "development") console.log((await response.json()).details)
    throw new Error(`Erro ao atualizar a marca`);
  }
  revalidatePath(`/panel/brands/${id}`)
  redirect(`/panel/brands/${id}`)
}