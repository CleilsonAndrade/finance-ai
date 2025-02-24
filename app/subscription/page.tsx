import Navbar from "@/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SubscriptionPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return <Navbar />;
}
