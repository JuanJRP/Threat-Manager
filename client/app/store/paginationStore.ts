import { create } from "zustand";

interface PaginationStore {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setTotalItems: (total: number) => void;
}


export const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
  setTotalItems: (total) => set({ totalItems: total }),
}))