import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { cookies } from "next/headers";
import { checkToken } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = cookies().get("session")?.value
  const isTokenValid = await checkToken(token)

  if (isTokenValid) {
    redirect("/todo")
  }

  return (
      <div className="h-full flex items-center justify-center p-3">
        <div className="w-[340px] h-[140px] select-none bg-white rounded-md flex flex-col justify-center items-center gap-6 px-4 py-2 shadow-2xl">
          <p className="font-semibold text-lg text-center">Welcome to my personal todo app!</p>
          <div className="w-full flex items-center justify-center gap-2">
            <GoogleAuthButton />
            <Link 
              href="/demo" 
              className="p-2 w-full bg-gray-200 font-semibold text-sm rounded-md text-center hover:bg-slate-100 duration-75 transition-all"
            >
              See demo
            </Link>
          </div>
        </div>
      </div>
  );
}
