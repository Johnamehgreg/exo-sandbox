import { create } from 'zustand';

interface SignUpFlowState {
  tab: 'signup' | 'otp' | 'success';  
  setTab: (tab: 'signup' | 'otp' | 'success') => void;  
}

export const useSignUpFlowStore = create<SignUpFlowState>((set) => ({
  tab: 'signup',  
  setTab: (tab) => set({ tab }),  
}));
