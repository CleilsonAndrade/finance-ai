import { auth, clerkClient } from "@clerk/nextjs/server";
import getCurrentMonthTransactions from "../get-current-month-transactions";

export default async function canUserAddTransaction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient.users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();

  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
}
