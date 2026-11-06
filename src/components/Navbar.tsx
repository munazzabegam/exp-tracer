import {
    LayoutDashboard,
    ArrowLeftRight,
    Wallet,
    CreditCard,
    ChartNoAxesCombined,
    Settings,
    IndianRupee,
    MoreHorizontal,
  } from "lucide-react";
  import "./Navbar.css";
  
  type NavbarProps = {
    page: string;
    setPage: (page: string) => void;
    transactionCount: number;
    mobileNav: boolean;
    setMobileNav: (open: boolean) => void;
  };
  
  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Transactions", icon: ArrowLeftRight },
    { name: "Accounts", icon: Wallet },
    { name: "Credit Cards", icon: CreditCard },
    { name: "Analytics", icon: ChartNoAxesCombined },
    { name: "Settings", icon: Settings },
  ];
  
  export default function Navbar({
    page,
    setPage,
    transactionCount,
    mobileNav,
    setMobileNav,
  }: NavbarProps) {
    return (
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <IndianRupee size={20} />
          </div>
  
          <span>
            paisa<span className="brand-light">track</span>
          </span>
        </div>
  
        <div className="workspace">PERSONAL FINANCE</div>
  
        <nav>
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${page === name ? "active" : ""}`}
              onClick={() => {
                setPage(name);
                setMobileNav(false);
              }}
            >
              <Icon size={18} />
              {name}
  
              {name === "Transactions" && (
                <span className="nav-count">{transactionCount}</span>
              )}
            </button>
          ))}
        </nav>
  
        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">M</div>
  
            <div>
              <b>Munna</b>
              <small>Personal workspace</small>
            </div>
  
            <MoreHorizontal size={18} />
          </div>
  
          <div className="secure">
            <span className="green-dot" />
            Private workspace
          </div>
        </div>
      </aside>
    );
  }
  