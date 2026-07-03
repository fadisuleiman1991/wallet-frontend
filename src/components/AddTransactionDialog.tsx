import { useState } from "react";
import type { Wallet } from "../types/Wallet";

interface Props {

    open: boolean;

    wallets: Wallet[];

    setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;

    onClose: () => void;

}

export default function AddTransactionDialog({

    open,

    wallets,

    setWallets,

    onClose

}: Props) {

    const [title, setTitle] = useState("");

    const [walletId, setWalletId] = useState(3);

    const [amount, setAmount] = useState(0);

    if (!open) return null;

    function save() {

        setWallets(prev =>

            prev.map(wallet =>

                wallet.id === walletId

                    ? {

                        ...wallet,

                        balance: wallet.balance - amount

                    }

                    : wallet

            )

        );

        setTitle("");

        setAmount(0);

        onClose();

    }

    return (

        <div className="overlay">

            <div className="dialog">

                <h2>إضافة عملية شراء</h2>

                <input

                    value={title}

                    onChange={e => setTitle(e.target.value)}

                    placeholder="ماذا اشتريت؟"

                />

                <select

                    value={walletId}

                    onChange={e => setWalletId(Number(e.target.value))}

                >

                    {wallets

                        .filter(x => x.id > 2)

                        .map(wallet => (

                            <option

                                key={wallet.id}

                                value={wallet.id}

                            >

                                {wallet.name}

                            </option>

                        ))}

                </select>

                <input

                    type="number"

                    value={amount}

                    onChange={e => setAmount(Number(e.target.value))}

                    placeholder="المبلغ"

                />

                <div className="buttons">

                    <button onClick={save}>

                        تم

                    </button>

                    <button onClick={onClose}>

                        إلغاء

                    </button>

                </div>

            </div>

        </div>

    );

}