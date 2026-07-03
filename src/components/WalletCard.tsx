import type { Wallet } from "../types/Wallet";

interface Props {
    wallet: Wallet;
}

export default function WalletCard({ wallet }: Props) {

    return (
        <div className={`wallet-card ${wallet.color}`}>

            <h3>{wallet.name}</h3>

            <h2>{wallet.balance} ₪</h2>

        </div>
    );

}