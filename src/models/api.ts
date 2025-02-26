export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface ApiError {
  errorCode: string;
  message: string;
}
