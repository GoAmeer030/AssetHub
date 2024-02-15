import { create } from "zustand";

import { ParamState } from "@/types/paramStore";
import { topicType } from "@/types/topicType";

export const useParamStore = create<ParamState>((set) => ({
  topics: [],
  searchResultTrigger: false,
  searchTopics: [],

  setTopics: (files: topicType[]) => set({ topics: files }),
  setSearchResultTrigger: (searchResultTrigger: boolean) => set({ searchResultTrigger }),
  setSearchTopics: (searchFiles: topicType[]) => set({ searchTopics: searchFiles }),
}));
