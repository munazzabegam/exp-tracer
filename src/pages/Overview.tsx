import {
    ArrowUpRight,
    ArrowDownRight,
    CalendarDays,
    Plus,
  } from "lucide-react";
  
  import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  type Transaction = {
    id: number;
    title: string;
    category: string;
    account: string;
    date: string;
    amount: number;
    type: "income" | "expense";
  };
  
  type OverviewProps = {
    transactions: Transaction[];
    income: number;
    expenses: number;
    balance: number;
    money: (amount: number) => string;
    onDelete: (id: number) => void;
    onNavigate: (page: string) => void;
  };
  
  const chartData = [
    { day: "1", income: 85, expense: 12 },
    { day: "5", income: 85, expense: 18 },
    { day: "10", income: 85, expense: 24 },
    { day: "15", income: 85, expense: 31 },
    { day: "20", income: 85, expense: 38 },
    { day: "25", income: 85, expense: 44 },
    { day: "30", income: 85, expense: 49 },
  ];
  
  export default function Overview({
    transactions,
    income,
    expenses,
    balance,
    money,
    onDelete,
    onNavigate,
  }: OverviewProps) {
    return (
      <>
        <div className="cards">
          <div className="metric-card balance">
            <div className="metric-top">
              <span>Available balance</span>
              <span className="pill green">This month</span>
            </div>
  
            <h2>{money(balance)}</h2>
  
            <div className="metric-foot">
              <span>
                <ArrowUpRight size={15} />
                {money(income)} income
              </span>
  
              <span>
                <ArrowDownRight size={15} />
                {money(expenses)} spent
              </span>
            </div>
          </div>
  
          <MetricCard
            title="Total income"
            value={money(income)}
            icon={<ArrowDownRight size={17} />}
            color="mint"
            footer="Salary received"
          />
  
          <MetricCard
            title="Total expenses"
            value={money(expenses)}
            icon={<ArrowUpRight size={17} />}
            color="orange"
            footer={`${income ? Math.round((expenses / income) * 100) : 0}% of income`}
          />
  
          <MetricCard
            title="Savings rate"
            value={`${income ? Math.round((balance / income) * 100) : 0}%`}
            icon="％"
            color="purple"
            footer="Income minus expenses"
          />
        </div>
  
        <div className="grid-main">
          <section className="panel">
            <div className="panel-head">
              <div>
                <h3>Cash flow</h3>
                <p>Income vs. spending overview</p>
              </div>
  
              <button className="select">
                <CalendarDays size={15} />
                This month
              </button>
            </div>
  
            <div className="chart-legend">
              <span>
                <i className="legend-income" /> Income
              </span>
              <span>
                <i className="legend-expense" /> Expenses
              </span>
            </div>
  
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis
                    dataKey="day"
                    stroke="#687482"
                    tickLine={false}
                    axisLine={false}
                  />
  
                  <YAxis
                    stroke="#687482"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `₹${v}k`}
                  />
  
                  <Tooltip
                    contentStyle={{
                      background: "#17211f",
                      border: "1px solid #293832",
                      borderRadius: 10,
                      color: "#fff",
                    }}
                  />
  
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#58d6a0"
                    fill="#58d6a022"
                    strokeWidth={2}
                  />
  
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#f5a56c"
                    fill="#f5a56c18"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
  
          <section className="panel">
            <div className="panel-head">
              <div>
                <h3>Accounts & cards</h3>
                <p>Your payment methods</p>
              </div>
  
              <button
                className="text-btn"
                onClick={() => onNavigate("Accounts")}
              >
                View all ↗
              </button>
            </div>
  
            <AccountRow
              symbol="₹"
              color="bank"
              title="Salary Account"
              subtitle="Bank account"
              value={money(balance)}
            />
  
            <AccountRow
              symbol="▣"
              color="debit"
              title="Commercial Debit Card"
              subtitle="Debit card"
              value={money(
                transactions
                  .filter((t) => t.account === "Commercial Debit Card")
                  .reduce((s, t) => s + t.amount, 0)
              )}
            />
  
            <AccountRow
              symbol="▰"
              color="credit"
              title="HDFC Credit Card"
              subtitle="Credit card"
              value={money(
                transactions
                  .filter((t) => t.account === "HDFC Credit Card")
                  .reduce((s, t) => s + t.amount, 0)
              )}
            />
  
            <button
              className="add-account"
              onClick={() => onNavigate("Accounts")}
            >
              <Plus size={15} />
              Manage accounts
            </button>
          </section>
        </div>
  
        <section className="panel recent">
          <div className="panel-head">
            <div>
              <h3>Recent transactions</h3>
              <p>Your latest money activity</p>
            </div>
  
            <button
              className="text-btn"
              onClick={() => onNavigate("Transactions")}
            >
              View all ↗
            </button>
          </div>
  
          <TransactionTable
            transactions={transactions.slice(0, 5)}
            onDelete={onDelete}
            money={money}
          />
        </section>
      </>
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
    money,
  }: {
    transactions: Transaction[];
    onDelete: (id: number) => void;
    money: (amount: number) => string;
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
                    ×
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
  