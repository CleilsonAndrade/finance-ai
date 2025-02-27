import { TransactionType } from "@prisma/client";

export type TransactionPercentePerType = {
  [key in TransactionType]: number;
};
