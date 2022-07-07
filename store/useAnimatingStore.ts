import create from "zustand";

type AnimatingData = {
	isAnimating: boolean;
	setIsAnimating: (isAnimating: boolean) => void;
};

export const useAnimatingStore = create<AnimatingData>((set) => ({
	isAnimating: false,
	setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
}));
