import { db } from "@/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentePerType } from "./types";

export default async function getDashboard(month: string) {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
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
    )?._sum.amount,
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
    )?._sum.amount,
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
    )?._sum.amount,
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
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentTotal || 0) / Number(transactionTotal)) * 100,
    ),
  };

  return {
    balance,
    depositsTotal,
    investmentTotal,
    expensesTotal,
    typesPercentage,
  };
}
