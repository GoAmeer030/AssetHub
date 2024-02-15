import { topicType } from "@/types/topicType";

export type ParamState = {
    topics: topicType[];
    searchResultTrigger: boolean;
    searchTopics: topicType[];

    setTopics: (files: topicType[]) => void;
    setSearchResultTrigger: (searchResultTrigger: boolean) => void;
    setSearchTopics: (searchFiles: topicType[]) => void;
}