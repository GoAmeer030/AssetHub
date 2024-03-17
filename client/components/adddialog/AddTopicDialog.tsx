'use client';

import AddTopicForm from '@/components/form/AddTopicForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useParamStore } from '@/stores/paramStore';

export default function AddTopicDialog() {
  const { addTopicDialogTrigger, setAddTopicDialogTrigger } = useParamStore();

  return (
    <Dialog
      open={addTopicDialogTrigger}
      onOpenChange={(open) => {
        setAddTopicDialogTrigger(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>
            Add Topic by entering the details. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AddTopicForm />
      </DialogContent>
    </Dialog>
  );
}
