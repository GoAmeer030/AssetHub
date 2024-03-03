import { create } from 'zustand';

import { ParamState } from '@/types/paramType';
import { topicType } from '@/types/topicType';
import { assetType } from '@/types/assetType';

export const useParamStore = create<ParamState>((set) => ({
  topics: [],
  searchTopicResultTrigger: false,
  searchTopics: [],
  assets: [],
  searchAssetResultTrigger: false,
  searchAssets: [],

  setTopics: (files: topicType[]) => set({ topics: files }),
  setSearchTopicResultTrigger: (searchTopicResultTrigger: boolean) =>
    set({ searchTopicResultTrigger: searchTopicResultTrigger }),
  setSearchTopics: (searchFiles: topicType[]) =>
    set({ searchTopics: searchFiles }),
  setAssets: (files: assetType[]) => set({ assets: files }),
  setSearchAssetResultTrigger: (searchAssetResultTrigger: boolean) =>
    set({ searchAssetResultTrigger: searchAssetResultTrigger }),
  setSearchAssets: (searchFiles: assetType[]) =>
    set({ searchAssets: searchFiles }),
}));
