import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import CreditCards from "./pages/CreditCards";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useMemo, useState, useEffect } from "react";
import {
  Plus,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  IndianRupee,
  Menu,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./style.css";

type Transaction = {
  id: number;
  title: string;
  category: string;
  account: string;
  date: string;
  amount: number;
  type: "income" | "expense";
};

type Account = {
  id: number;
  name: string;
  type: "Bank" | "Cash" | "UPI" | "Debit Card";
  balance: number;
  color: string;
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Salary",
    account: "Salary Account",
    date: "2026-11-01",
    amount: 85000,
    type: "income",
  },
  {
    id: 2,
    title: "PG Rent",
    category: "Housing",
    account: "Commercial Debit Card",
    date: "2026-11-02",
    amount: 12000,
    type: "expense",
  },
  {
    id: 3,
    title: "Groceries",
    category: "Food",
    account: "Commercial Debit Card",
    date: "2026-11-03",
    amount: 2450,
    type: "expense",
  },
  {
    id: 4,
    title: "Fuel",
    category: "Transport",
    account: "Commercial Debit Card",
    date: "2026-11-04",
    amount: 1800,
    type: "expense",
  },
  {
    id: 5,
    title: "Amazon purchase",
    category: "Shopping",
    account: "HDFC Credit Card",
    date: "2026-11-05",
    amount: 3299,
    type: "expense",
  },
  {
    id: 6,
    title: "Dinner",
    category: "Food",
    account: "UPI",
    date: "2026-11-06",
    amount: 650,
    type: "expense",
  },
];

const chartData = [
  { day: "1", income: 85, expense: 12 },
  { day: "5", income: 85, expense: 18 },
  { day: "10", income: 85, expense: 24 },
  { day: "15", income: 85, expense: 31 },
  { day: "20", income: 85, expense: 38 },
  { day: "25", income: 85, expense: 44 },
  { day: "30", income: 85, expense: 49 },
];

const initialAccounts: Account[] = [
  {
    id: 1,
    name: "Salary Account",
    type: "Bank",
    balance: 85000,
    color: "#58d6a0",
  },
  {
    id: 2,
    name: "Commercial Debit Card",
    type: "Debit Card",
    balance: 25000,
    color: "#6366f1",
  },
  {
    id: 3,
    name: "Cash",
    type: "Cash",
    balance: 2000,
    color: "#f5a56c",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);


export default function App() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(() => {
      const saved = localStorage.getItem("paisa-transactions");

      return saved
        ? JSON.parse(saved)
        : initialTransactions;
    });

    useEffect(() => {
      localStorage.setItem(
        "paisa-transactions",
        JSON.stringify(transactions)
      );
    }, [transactions]);

    const [accounts, setAccounts] = useState<Account[]>(() => {
      const saved = localStorage.getItem("paisa-accounts");
    
      return saved ? JSON.parse(saved) : initialAccounts;
    });
    
    useEffect(() => {
      localStorage.setItem("paisa-accounts", JSON.stringify(accounts));
    }, [accounts]);

  const [page, setPage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Food",
    account: "Commercial Debit Card",
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    type: "expense" as "income" | "expense",
  });

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) =>
        `${t.title} ${t.category} ${t.account}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [transactions, search],
  );

  function addTransaction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const transaction: Transaction = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
    };

    setTransactions((prev) => [transaction, ...prev]);
    setModal(false);

    setForm((prev) => ({
      ...prev,
      title: "",
      amount: "",
    }));
  }

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <Navbar
        page={page}
        setPage={setPage}
        transactionCount={transactions.length}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
      />

      {/* MAIN */}
      <main className="main">
      <Header
        page={page}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
      />

        <div className="content">
          <div className="page-head">
            <div>
              <div className="eyebrow">PERSONAL FINANCE</div>
              <h1>
                {page === "Overview"
                  ? "Your money, at a glance"
                  : page}
              </h1>
              <p className="sub">
                A clear view of your finances this month.
              </p>
            </div>

            <button className="primary" onClick={() => setModal(true)}>
              <Plus size={17} />
              Add transaction
            </button>
          </div>

          {page === "Overview" ? (
            <Overview
              transactions={transactions}
              income={income}
              expenses={expenses}
              balance={balance}
              money={money}
              onDelete={deleteTransaction}
              onNavigate={setPage}
            />
          ) : page === "Accounts" ? (
            <Accounts accounts={accounts} money={money} />
          ) : page === "Credit Cards" ? (
            <CreditCards />
          ) : (
            <Transactions
            transactions={filteredTransactions}
            search={search}
            setSearch={setSearch}
            money={money}
            onDelete={deleteTransaction}
          />
        )}



          <section className="panel recent">
            <div className="panel-head">
              <div>
                <h3>Recent transactions</h3>
                <p>Your latest money activity</p>
              </div>
              <button
                className="text-btn"
                onClick={() => setPage("Transactions")}
              >
                View all ↗
              </button>
            </div>

            <TransactionTable
              transactions={transactions.slice(0, 5)}
              onDelete={deleteTransaction}
            />
          </section>

          <footer />
        </div>
      </main>

      {/* ADD TRANSACTION MODAL */}
      {modal && (
        <div className="overlay" onClick={() => setModal(false)}>
          <form
            className="modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={addTransaction}
          >
            <div className="modal-head">
              <div>
                <h2>Add transaction</h2>
                <p>Record income or an expense.</p>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setModal(false)}
              >
                ×
              </button>
            </div>

            <div className="type-switch">
              <button
                type="button"
                className={form.type === "expense" ? "chosen" : ""}
                onClick={() =>
                  setForm({ ...form, type: "expense" })
                }
              >
                Expense
              </button>
              <button
                type="button"
                className={form.type === "income" ? "chosen income" : ""}
                onClick={() =>
                  setForm({ ...form, type: "income" })
                }
              >
                Income
              </button>
            </div>

            <label>
              Description
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="e.g. Groceries"
              />
            </label>

            <div className="form-row">
              <label>
                Amount (₹)
                <input
                  required
                  type="number"
                  min="1"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                  placeholder="0"
                />
              </label>

              <label>
                Date
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {[
                    "Food",
                    "Housing",
                    "Transport",
                    "Shopping",
                    "Bills",
                    "Health",
                    "Salary",
                    "Other",
                  ].map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>

              <label>
                Account
                <select
                  value={form.account}
                  onChange={(e) =>
                    setForm({ ...form, account: e.target.value })
                  }
                >
                  {[
                    "Salary Account",
                    "Commercial Debit Card",
                    "HDFC Credit Card",
                    "UPI",
                    "Cash",
                  ].map((account) => (
                    <option key={account}>{account}</option>
                  ))}
                </select>
              </label>
            </div>

            <button className="primary full" type="submit">
              <Plus size={16} />
              Save transaction
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
  footer,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  footer: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <span className={`metric-icon ${color}`}>{icon}</span>
      </div>
      <h2>{value}</h2>
      <div className="metric-foot muted">
        <span className="green-dot" />
        {footer}
      </div>
    </div>
  );
}

function AccountRow({
  symbol,
  color,
  title,
  subtitle,
  value,
}: {
  symbol: string;
  color: string;
  title: string;
  subtitle: string;
  value: string;
}) {
  return (
    <div className="account-row">
      <div className={`account-symbol ${color}`}>{symbol}</div>
      <div className="account-info">
        <b>{title}</b>
        <small>{subtitle}</small>
      </div>
      <strong>{value}</strong>
    </div>
  );
}

function TransactionTable({
  transactions,
  onDelete,
}: {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}) {
  return (
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
                  },
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
  );
}
