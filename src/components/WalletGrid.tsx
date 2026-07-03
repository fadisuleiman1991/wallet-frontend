import WalletCard from "./WalletCard";
import type { Wallet } from "../types/Wallet";

interface Props {

    wallets: Wallet[];

    onAdd: () => void;

}

export default function WalletGrid({

    wallets,

    onAdd

}: Props) {

    return (

        <div className="grid">

            {wallets.map(wallet => (

    <div key={wallet.id} className={`card ${wallet.color}`}>
        <h3>{wallet.name}</h3>
        <p>{wallet.balance} ₪</p>
    </div>

            ))}

            <button

                className="wallet-card add-button"

                onClick={onAdd}

            >

                +

            </button>

        </div>

    );

}