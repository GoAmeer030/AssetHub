import { create } from 'zustand';

import { assetState } from '@/types/assetType';

export const useAssetStore = create<assetState>((set) => ({
  id: '',
  assetname: '',
  assettype: '',
  asseturl: null,
  file: null,

  setId: (fileid: string) => set({ id: fileid }),
  setAssetName: (assetname: string) => set({ assetname }),
  setAssetType: (assettype: string) => set({ assettype }),
  setAssetUrl: (asseturl: string) => set({ asseturl }),
  setFile: (file: File) => set({ file }),

  resetAsset: () =>
    set({
      id: '',
      assetname: '',
      assettype: '',
      asseturl: null,
      file: null,
    }),
}));
