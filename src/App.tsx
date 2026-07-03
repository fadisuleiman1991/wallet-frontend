import { useState } from "react";
import "./App.css";

const wallets = [
  { id: 1, name: "الدخل", balance: 2150, color: "green" },
  { id: 2, name: "المدخر", balance: 0, color: "red" },
  { id: 3, name: "التكاليف الثابتة", balance: 1115, color: "white" },
  { id: 4, name: "التكاليف شبه الثابتة", balance: 200, color: "white" },
  { id: 5, name: "طعام", balance: 400, color: "white" },
  { id: 6, name: "ملابس", balance: 100, color: "white" },
  { id: 7, name: "اعتناء بالجسم", balance: 50, color: "white" },
  { id: 8, name: "ترفيه", balance: 50, color: "white" },
  { id: 9, name: "أثاث", balance: 200, color: "white" },
];

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid">

        {wallets.map((wallet) => (
          <div key={wallet.name} className={`card ${wallet.color}`}>
            <div>{wallet.name}</div>
            <div>&nbsp;</div>
            <div>{wallet.balance}</div>
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

            <input
              type="text"
              placeholder="ماذا اشتريت؟"
            />

            <select>
              {wallets
                .filter(
                  (x) =>
                    x.name !== "الدخل" &&
                    x.name !== "المدخر"
                )
                .map((wallet) => (
                  <option key={wallet.name}>
                    {wallet.name}
                  </option>
                ))}
            </select>

            <input
              type="number"
              placeholder="المبلغ"
            />

            <div className="buttons">
              <button onClick={() => setOpen(false)}>
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
