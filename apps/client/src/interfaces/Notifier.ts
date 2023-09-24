export type NotifierOptions = {
  title: string;
  message?: string;
  status: "error" | "warning" | "info" | "success";
  actions?: {
    label: string;
    onClick: () => void;
  }[];
};

export interface Notifier {
  notify(options: NotifierOptions): void;
  getContainer(): () => JSX.Element;
}
