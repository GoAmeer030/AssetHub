'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AddAssetForm from '@/components/form/AddAssetForm';
import { useParamStore } from '@/stores/paramStore';

export default function AddAssetDialog() {
  const { addAssetDialogTrigger, setAddAssetDialogTrigger } = useParamStore();

  return (
    <Dialog
      open={addAssetDialogTrigger}
      onOpenChange={(open) => {
        setAddAssetDialogTrigger(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>
            Add Topic by entering the details. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AddAssetForm />
      </DialogContent>
    </Dialog>
  );
}
