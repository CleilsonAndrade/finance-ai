import { CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Progress } from "@/_components/ui/progress";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/_constants/transactions";
import { TotalExpensePerCategory } from "@/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

export default function ExpensesPerCategory({
  expensesPerCategory,
}: ExpensesPerCategoryProps) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
