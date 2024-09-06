import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <VscLoading size={64} className="animate-spin" />
    </div>
  )
}