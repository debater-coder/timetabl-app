export interface AuthActions {
  login(): Promise<void>;
  resolve(): Promise<void>;
  logout(): Promise<void>;
}
