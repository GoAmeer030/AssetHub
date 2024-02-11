import { create } from "zustand";

import { fileType } from "@/types/fileType";

type ParamStore = {
    files: fileType[];
    searchResultTrigger: boolean;
    searchFiles: fileType[];

    setFiles: (files: fileType[]) => void;
    setSearchResultTrigger: (searchResultTrigger: boolean) => void;
    setSearchFiles: (searchFiles: fileType[]) => void;
}

export const useParamStore = create<ParamStore>((set) => ({
  files: [],
  searchResultTrigger: false,
  searchFiles: [],

  setFiles: (files: fileType[]) => set({ files }),
  setSearchResultTrigger: (searchResultTrigger: boolean) =>
    set({ searchResultTrigger }),
  setSearchFiles: (searchFiles: fileType[]) => set({ searchFiles }),
}));
