import { Button } from "@/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { ScrollArea } from "@/_components/ui/scroll-area";
import {
  TRANSACTION_PAYMENT_METHOD_ICONS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/_constants/transactions";
import formatCurrency from "@/_utils/currency";
import { transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransacationsProps {
  lastTransactions: transaction[];
}

export default function LastTransacations({
  lastTransactions,
}: LastTransacationsProps) {
  const getAmountColor = (transaction: transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }

    return "text-white";
  };

  const getAmountPrefix = (transaction: transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }

    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Utimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => {
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div key={transaction.id} className="flex items-center gap-3">
                <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
                  <Image
                    src={
                      TRANSACTION_PAYMENT_METHOD_ICONS[
                        transaction.paymentMethod
                      ]
                    }
                    height={20}
                    width={20}
                    alt={
                      TRANSACTION_PAYMENT_METHOD_LABELS[
                        transaction.paymentMethod
                      ]
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-muted-foregroun text-sm">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {formatCurrency(Number(transaction.amount))}
              </p>
            </div>
          );
        })}
      </CardContent>
    </ScrollArea>
  );
}
