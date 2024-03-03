import { topicType } from '@/types/topicType';
import { assetType } from '@/types/assetType';

export type ParamState = {
  topics: topicType[];
  searchTopicResultTrigger: boolean;
  searchTopics: topicType[];
  assets: assetType[];
  searchAssetResultTrigger: boolean;
  searchAssets: assetType[];

  setTopics: (files: topicType[]) => void;
  setSearchTopicResultTrigger: (searchResultTrigger: boolean) => void;
  setSearchTopics: (searchFiles: topicType[]) => void;
  setAssets: (files: assetType[]) => void;
  setSearchAssetResultTrigger: (searchResultTrigger: boolean) => void;
  setSearchAssets: (searchFiles: assetType[]) => void;
};
