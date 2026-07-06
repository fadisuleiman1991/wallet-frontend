import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const walletsTableName = "Wallets";
  const lastUpdateName = "lastUpdate";
  const transferableWallets = ["طعام", "أثاث", "شبه الثابتة"];
  const nonTransferableWallets = ["ملابس", "اعتناء بالجسم", "ترفيه"];

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedId, setSelectedId] = useState(3);
  const [lastUpdate, setLastUpdate] = useState([{ id: 1, value: "2000-01" }]);
  const [wallets, setWallets] = useState([
    { id: 1, name: "الدخل", balance: 0, color: "green", sort_id: 1, constant: 0 },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    loadTable(walletsTableName, "sort_id", setWallets);
    loadTable(lastUpdateName, "id", setLastUpdate);
  }

  async function loadTable(tableName: string, orderBy: string, setData: (data: any) => void) {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order(orderBy, { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setData(data);
  }

  const handleAdd = async () => {
    const wallet = wallets.find((item) => item.id === Number(selectedId));
    if (!wallet) return;

    await supabase
      .from(walletsTableName)
      .update({ balance: wallet.balance - Number(amount) })
      .eq("id", Number(selectedId));

    loadTable(walletsTableName, "sort_id", setWallets);
  };

  async function updateWallets(): Promise<void> {
    const currentMonth = new Date().toISOString().slice(0, 7);

    if (lastUpdate[0].value !== currentMonth) {
      const newWallets = wallets.map((wallet) => {
        let balance = wallet.balance;
        if (wallet.name === "المدخر") {
          balance =
            wallet.balance +
            wallets.reduce(
              (acc, w) =>
                acc +
                (transferableWallets.includes(w.name)
                  ? w.balance
                  : 0),
              0
            );
        }
        else if (transferableWallets.includes(wallet.name)) {
          balance = wallet.constant;
        } else if (nonTransferableWallets.includes(wallet.name)) {
          balance += wallet.constant;
        }
        return { ...wallet, balance };
      });

      await supabase
          .from(walletsTableName)
          .upsert(newWallets),

        await supabase
          .from(lastUpdateName)
          .upsert({id: 1, value: currentMonth })

      loadData();

    } else {
      alert("لا يوجد تحديث لهذا الشهر");
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">

        {wallets.map((wallet) => (
          <div key={wallet.id} className={`flex-col card bg-${wallet.color}-100`}>
            <div>{wallet.name}</div>
            <div className={`font-bold ${wallet.balance < 0 ? "text-red-500" : "text-black-500"}`}>
              {wallet.balance}
            </div>
          </div>
        ))}

        <button className="card add row-start-2 col-start-2" onClick={() => setOpen(true)}>
          +
        </button>

        <button className="col-span-2 card bg-blue-500 text-white" onClick={() => updateWallets()}>
          حدث الشهر
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
                    x.id > 3
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
                setSelectedId(4);
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
