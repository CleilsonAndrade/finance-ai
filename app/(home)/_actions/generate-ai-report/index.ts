"use server";

import { db } from "@/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export default async function generateAiReport({
  month,
}: GenerateAiReportSchema) {
  generateAiReportSchema.parse({ month });

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient.users.getUser(userId);
  const hasPremium = user.publicMetadata.subscription === "premium";

  if (!hasPremium) {
    throw new Error("You need a premium plan to genetate AI reports");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  const now = new Date();
  const year = now.getFullYear();

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${year}-${month}-01`),
        lte: new Date(`${year}-${month}-31`),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completions = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completions.choices[0].message;
}
