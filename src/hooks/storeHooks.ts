import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
