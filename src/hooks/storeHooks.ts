import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useReduxSelector.withTypes<RootState>();
