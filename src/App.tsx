import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const walletsTableName = "Wallets";
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedId, setSelectedId] = useState(3);
  const [wallets, setWallets] = useState([
    { id: 1, name: "الدخل", balance: 0 },
  ]);

  useEffect(() => {
    loadWallets();
  }, []);

  async function loadWallets() {
    const { data, error } = await supabase
      .from(walletsTableName)
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setWallets(data);
  }

  const handleAdd = async () => {
    const wallet = wallets.find((item) => item.id === Number(selectedId));
    if (!wallet) return;

    await supabase
      .from(walletsTableName)
      .update({ balance: wallet.balance - Number(amount) })
      .eq("id", Number(selectedId));

    loadWallets();
  };

  return (
    <>
      <div className="grid">

        {wallets.map((wallet) => (
          <div key={wallet.id} className={`flex-col card ${wallet.id <= 2 ? "bg-green-500" : "bg-white-500"}`}>
            <div>{wallet.name}</div>
            <div className={wallet.balance < 0 ? "text-red-500" : "text-black-500"}>{wallet.balance}</div>
          </div>
        ))}

        <button className="card add" onClick={() => setOpen(true)}>
          +
        </button>

      </div>

      {open && (
        <div className="overlay">
          <div className="dialog">

            <h2>إضافة عملية شراء</h2>

            <select
              value={selectedId}
              onChange={(e) => setSelectedId(parseInt(e.target.value))}
            >
              {wallets
                .filter(
                  (x) =>
                    x.name !== "الدخل" &&
                    x.name !== "المدخر"
                )
                .map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
            </select>

            <input
              type="number"
              placeholder="المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="buttons">
              <button onClick={() => {
                handleAdd();
                setAmount("");
                setSelectedId(3);
                setOpen(false);
              }}>
                تم
              </button>

              <button onClick={() => setOpen(false)}>
                إلغاء
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default App;
