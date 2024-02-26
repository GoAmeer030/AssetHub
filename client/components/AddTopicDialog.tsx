'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AddTopicForm from '@/components/form/AddTopicForm';
import { Separator } from './ui/separator';

export default function AddTopicDialog({
  dialogTrigger,
  setDialogTrigger,
}: {
  dialogTrigger: boolean;
  setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      open={dialogTrigger}
      onOpenChange={(open) => {
        setDialogTrigger(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>
            Add Topic by entering the details. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AddTopicForm setDialogTrigger={setDialogTrigger} />
      </DialogContent>
    </Dialog>
  );
}
