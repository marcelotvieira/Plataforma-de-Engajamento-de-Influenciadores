import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <img src="/assets/images/logo.png" alt="" className="max-w-xs" />
      <h1 className="font-semibold text-center">
        Plataforma de Engajamento de Influenciadores
      </h1>

      <p className="text-muted-foreground max-w-sm text-sm my-4 text-center">
        A plataforma conectará marcas a influenciadores digitais, facilitando parcerias e campanhas de marketing.
      </p>
      <Button asChild >
        <a href="/panel/influencers" >Ir ao Aplicativo</a>
      </Button>
    </div>
  )
}