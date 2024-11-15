import { create } from "zustand";

interface ModalState {
  showModal: boolean;
  showDeleteModal: boolean;
  openModal: () => void;
  openDeleteModal: () => void;
  closeModal: () => void;
  closeDeleteModal: () => void;
}

const useModalStore = create<ModalState>()((set) => ({
  showModal: false,
  showDeleteModal: false,
  openModal: () => set({ showModal: true }),
  openDeleteModal: () => set({ showDeleteModal: true }),
  closeModal: () => set({ showModal: false }),
  closeDeleteModal: () => set({ showDeleteModal: false }),
}));

export default useModalStore;
