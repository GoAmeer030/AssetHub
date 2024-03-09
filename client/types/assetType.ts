export type assetState = {
  id: string;
  assetname: string;
  assettype: string;
  asseturl: string;

  setId: (fileid: string) => void;
  setAssetName: (assetname: string) => void;
  setAssetType: (assettype: string) => void;
  setAssetUrl: (asseturl: string) => void;

  resetAsset: () => void;
};

export type assetType = {
  id: string;
  assetname: string;
  assettype: string;
  asseturl: string;
};
