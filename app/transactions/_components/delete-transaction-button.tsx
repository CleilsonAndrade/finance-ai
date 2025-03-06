import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import deleteTransaction from "../_actions/delete-transaction";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

export default function DeleteTransactionButton({
  transactionId,
}: DeleteTransactionButtonProps) {
  const handleConfirmeDeleteClick = async () => {
    try {
      await deleteTransaction({ transactionId });
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.success("Ocorreu um erro ao deletar a transação.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foregorund">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja realmente deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmeDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
