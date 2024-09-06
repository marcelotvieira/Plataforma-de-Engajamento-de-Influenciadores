"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CredentialsSignin } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { VscLoading } from "react-icons/vsc";

interface IAuthData {
  email: string
  senha: string
}

export default function Auth() {
  const { register, handleSubmit, formState: { errors } } = useForm<IAuthData>();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter()

  const onSubmit: SubmitHandler<IAuthData> = async (data: IAuthData) => {
    setIsLoading(true)
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data
      })
      if (res?.error) return setLoginError("Credenciais inválidas")
      router.push("/panel/influencers")
    } catch (e) {
      setLoginError((e as Error).message)
    } finally { setIsLoading(false) }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/assets/images/logo_short.png" alt="" className="max-w-[240px]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6"
      >
        <h3 className="font-semibold text-center">Login</h3>
        <p className="text-xs mb-4 text-center">Administrador</p>

        <p className="text-xs mb-4 text-red-500 text-center">{loginError}</p>
        <div className="mb-2">
          <Input
            disabled={isLoading}
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <div className="h-4">
            {errors.email && <p className="text-red-500 text-xs"> Informe o Email</p>}
          </div>
        </div>

        <div className="mb-2">
          <Input
            disabled={isLoading}
            placeholder="Senha"
            type="senha"
            {...register("senha", { required: true })}
          />
          <div className="h-4">
            {errors.senha && <p className="text-red-500 text-xs">Informe a Senha</p>}
          </div>
        </div>
        <Button
          disabled={isLoading}
          variant="ghost"
          type="submit"
          className="w-full flex items-center gap-2 rounded-full shadow-none bg-red font-normal">
          {isLoading && <VscLoading className="animate-spin" />}
          Entrar
        </Button>
      </form>
    </div>
  )
}