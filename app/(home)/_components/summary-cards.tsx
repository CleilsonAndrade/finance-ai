import { PiggyBankIcon, TrendingDownIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

export default async function SummaryCards({
  balance,
  investmentTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-primary" />}
          title="Receita"
          amount={2500}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
}
