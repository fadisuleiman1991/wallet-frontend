import { useState } from "react";
import WalletGrid from "../components/WalletGrid";
import AddTransactionDialog from "../components/AddTransactionDialog";
import { initialWallets } from "../data/wallets";

export default function Dashboard() {
  const [wallets, setWallets] = useState(initialWallets);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <WalletGrid
        wallets={wallets}
        onAddClick={() => setDialogOpen(true)}
      />

      <AddTransactionDialog
        open={dialogOpen}
        wallets={wallets}
        onClose={() => setDialogOpen(false)}
        setWallets={setWallets}
      />
    </>
  );
}