"use server";

import { db } from "@/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteTransactionSchema } from "./schema";

export default async function deleteTransaction({
  transactionId,
}: DeleteTransactionSchema) {
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
}
