export type assetState = {
  id: string;
  assetname: string;
  assetdesc: string;
  assettype: string;
  asseturl: string;

  setId: (fileid: string) => void;
  setAssetName: (assetname: string) => void;
  setAssetDesc: (assetdesc: string) => void;
  setAssetType: (assettype: string) => void;
  setAssetUrl: (asseturl: string) => void;

  resetAsset: () => void;
};

export type assetType = {
  id: string;
  assetname: string;
  assetdesc: string;
  assettype: string;
  asseturl: string;
};
