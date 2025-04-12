export interface ApiErrorResponse {
  status: number;
  data: string | Record<string, unknown>;
}

export interface LoadingErrorWrapperProps {
  loading: boolean;
  error: ApiErrorResponse;
  children: React.ReactNode;
}
