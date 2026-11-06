import { Search, Trash2 } from "lucide-react";

type Transaction = {
  id: number;
  title: string;
  category: string;
  account: string;
  date: string;
  amount: number;
  type: "income" | "expense";
};

type TransactionsProps = {
  transactions: Transaction[];
  search: string;
  setSearch: (value: string) => void;
  money: (amount: number) => string;
  onDelete: (id: number) => void;
};

export default function Transactions({
  transactions,
  search,
  setSearch,
  money,
  onDelete,
}: TransactionsProps) {
  return (
    <section className="panel transactions-panel">
      <div className="panel-head">
        <div>
          <h3>All transactions</h3>
          <p>Manage and review your money activity</p>
        </div>
      </div>

      <div className="table-tools">
        <div className="searchbox">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
          />
        </div>

        <span className="sub">{transactions.length} records</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>TRANSACTION</th>
              <th>ACCOUNT</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="tx-title">
                    <span className={`tx-icon ${t.type}`}>
                      {t.type === "income" ? "↙" : "↗"}
                    </span>
                    <div>
                      <b>{t.title}</b>
                      <small>{t.category}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="account-tag">{t.account}</span>
                </td>

                <td className="date-cell">
                  {new Date(t.date + "T00:00:00").toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </td>

                <td
                  className={`amount ${
                    t.type === "income" ? "income-amount" : ""
                  }`}
                >
                  {t.type === "income" ? "+" : "−"}
                  {money(t.amount)}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    title="Delete transaction"
                    onClick={() => onDelete(t.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="empty">No transactions found.</div>
        )}
      </div>
    </section>
  );
}
