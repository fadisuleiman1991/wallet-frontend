export type WalletType = "CONSTANT" | "CALCULABLE" | "TRANSFERABLE" | "CUMULATIVE";

export interface Wallet {
  id: number;
  name: string;
  balance: number;
  color: string;
  sort_id: number;
  constant: number;
  type: WalletType;
}
