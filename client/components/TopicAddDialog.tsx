"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TopicAddForm from "@/components/form/TopicAddForm";

export default function TopicAddDialog({
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
            Add Topic by entering the details. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <TopicAddForm setDialogTrigger={setDialogTrigger} />
      </DialogContent>
    </Dialog>
  );
}
