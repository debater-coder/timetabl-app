export interface DataProvider {
  activate(): void;
  deactivate(): void;
  isActivated(): boolean;
}
