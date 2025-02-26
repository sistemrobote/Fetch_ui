export type LoginInputs = {
  email: string;
  password: string;
};

export type AuthState = {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
};
