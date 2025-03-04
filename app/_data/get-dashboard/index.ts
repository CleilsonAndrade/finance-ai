import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentePerType } from "./types";

export default async function getDashboard(month: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const now = new Date();
  const year = now.getFullYear();

  const where = {
    userID: userId,
    date: {
      gte: new Date(`${year}-${month}-01`),
      lte: new Date(`${year}-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum.amount || 0,
  );

  const investmentTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum.amount || 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum.amount || 0,
  );

  const balance = depositsTotal - investmentTotal - expensesTotal;

  const transactionTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: {
          amount: true,
        },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentePerType = {
    [TransactionType.DEPOSIT]: transactionTotal
      ? Math.round((depositsTotal / transactionTotal) * 100)
      : 0,
    [TransactionType.EXPENSE]: transactionTotal
      ? Math.round((expensesTotal / transactionTotal) * 100)
      : 0,
    [TransactionType.INVESTMENT]: transactionTotal
      ? Math.round((investmentTotal / transactionTotal) * 100)
      : 0,
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => {
    const totalAmount = Number(category._sum?.amount || 0);
    return {
      category: category.category,
      totalAmount,
      percentageOfTotal: expensesTotal
        ? Math.round((totalAmount / expensesTotal) * 100)
        : 0,
    };
  });

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  return {
    balance,
    depositsTotal,
    investmentTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
}
