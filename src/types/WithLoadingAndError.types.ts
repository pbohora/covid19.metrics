export interface ApiErrorResponse {
  status: number;
  data: string | Record<string, unknown>;
}

export interface LoadingErrorWrapperProps {
  loading: boolean;
  isFetching?: boolean;
  error: ApiErrorResponse | null;
  children: React.ReactNode;
}
