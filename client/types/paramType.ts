import { topicType } from '@/types/topicType';
import { assetType } from '@/types/assetType';

type TopicState = {
  topics: topicType[];
  searchTopicResultTrigger: boolean;
  searchTopics: topicType[];
  addTopicDialogTrigger: boolean;

  setTopics: (files: topicType[]) => void;
  setSearchTopicResultTrigger: (searchResultTrigger: boolean) => void;
  setSearchTopics: (searchFiles: topicType[]) => void;
  setAddTopicDialogTrigger: (addTopicDialogTrigger: boolean) => void;
};

type AssetState = {
  assets: assetType[];
  searchAssetResultTrigger: boolean;
  searchAssets: assetType[];
  addAssetDialogTrigger: boolean;

  setAssets: (files: assetType[]) => void;
  setSearchAssetResultTrigger: (searchResultTrigger: boolean) => void;
  setSearchAssets: (searchFiles: assetType[]) => void;
  setAddAssetDialogTrigger: (addAssetDialogTrigger: boolean) => void;
};

type PageState = {
  page: string;

  setPage: (page: string) => void;
};

export type ParamState = TopicState & AssetState & PageState;
