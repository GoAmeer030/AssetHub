"use client";

// UI components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Forms
import FileUploadForm from "@/components/form/FileUploadForm";


export default function FileUploadDialog({
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
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Choose the File and update the details. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <FileUploadForm setDialogTrigger={setDialogTrigger}/>
            </DialogContent>
        </Dialog>
    );
}
