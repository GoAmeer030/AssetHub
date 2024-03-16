import { create } from 'zustand';

import { ParamState } from '@/types/paramType';
import { topicType } from '@/types/topicType';
import { assetType } from '@/types/assetType';

export const useParamStore = create<ParamState>((set) => ({
  // Topic related state
  topics: [],
  searchTopicResultTrigger: false,
  searchTopics: [],
  addTopicDialogTrigger: false,

  setTopics: (topics: topicType[]) => set({ topics }),
  setSearchTopicResultTrigger: (searchTopicResultTrigger: boolean) =>
    set({ searchTopicResultTrigger }),
  setSearchTopics: (searchTopics: topicType[]) => set({ searchTopics }),
  setAddTopicDialogTrigger: (addTopicDialogTrigger: boolean) =>
    set({ addTopicDialogTrigger }),

  // Asset related state
  assets: [],
  searchAssetResultTrigger: false,
  searchAssets: [],
  addAssetDialogTrigger: false,

  setAssets: (assets: assetType[]) => set({ assets }),
  setSearchAssetResultTrigger: (searchAssetResultTrigger: boolean) =>
    set({ searchAssetResultTrigger }),
  setSearchAssets: (searchAssets: assetType[]) => set({ searchAssets }),
  setAddAssetDialogTrigger: (addAssetDialogTrigger: boolean) =>
    set({ addAssetDialogTrigger }),

  // Page related state
  page: '',

  setPage: (page: string) => set({ page }),
}));
