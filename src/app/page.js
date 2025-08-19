import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { cookies } from "next/headers";
import { checkToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  const isTokenValid = await checkToken(token)

  if (isTokenValid) {
    redirect("/app")
  }

  return (
    <div className="h-full flex items-center justify-center p-3">
      <div className="w-[340px] h-[140px] select-none bg-white rounded-md flex flex-col justify-center items-center gap-6 px-4 py-2 shadow-2xl">
        <p className="font-semibold text-lg text-center">Welcome back, boss!</p>
        <div className="w-full flex items-center justify-center gap-2">
          <GoogleAuthButton clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
          <Link
            href="/demo"
            className="p-2 w-full bg-gray-200 font-semibold text-sm rounded-md text-center hover:bg-gray-300 duration-75 transition-all"
          >
            See demo
          </Link>
        </div>
      </div>
    </div>
  );
}