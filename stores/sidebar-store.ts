import { create } from "zustand";

export interface SidebarState {
  isOpen: boolean;
  isMinimal: boolean;
  handleOpenorClose: () => void;
  handleClose: () => void;
  handChangeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isMinimal: false,
  handleOpenorClose: () =>
    set((state) => ({ ...state, isOpen: !state.isOpen })),
  handleClose: () => set((state) => ({ ...state, isOpen: false })),
  handChangeSidebar: () =>
    set((state) => ({ ...state, isMinimal: !state.isMinimal })),
}));
