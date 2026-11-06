import "./Accounts.css";
import { Wallet, CreditCard, Banknote } from "lucide-react";

type Account = {
  id: number;
  name: string;
  type: "Bank" | "Cash" | "UPI" | "Debit Card";
  balance: number;
  color: string;
};

type AccountsProps = {
  accounts: Account[];
  money: (amount: number) => string;
};

export default function Accounts({ accounts, money }: AccountsProps) {
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <section className="accounts-page">
      <div className="panel accounts-summary">
        <span className="sub">TOTAL ACCOUNT BALANCE</span>
        <h2>{money(totalBalance)}</h2>
        <p>{accounts.length} accounts connected</p>
      </div>

      <div className="accounts-grid">
        {accounts.map((account) => {
          const Icon =
            account.type === "Debit Card"
              ? CreditCard
              : account.type === "Cash"
              ? Banknote
              : Wallet;

          return (
            <div className="panel account-card" key={account.id}>
              <div className="account-card-top">
                <span
                  className="account-icon"
                  style={{ background: account.color }}
                >
                  <Icon size={21} color="#fff" />
                </span>
                <span className="account-tag">{account.type}</span>
              </div>

              <h3>{account.name}</h3>
              <span className="sub">Available balance</span>
              <h2>{money(account.balance)}</h2>
            </div>
          );
        })}
      </div>

      {accounts.length === 0 && (
        <div className="panel empty">No accounts available.</div>
      )}
    </section>
  );
}
