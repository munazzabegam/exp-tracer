
import { Search, Bell, Menu } from "lucide-react";
import "./Header.css";

type HeaderProps = {
  page: string;
  mobileNav: boolean;
  setMobileNav: (open: boolean) => void;
};

export default function Header({
  page,
  mobileNav,
  setMobileNav,
}: HeaderProps) {
  return (
    <header>
      <button
        className="icon-btn mobile-menu"
        onClick={() => setMobileNav(!mobileNav)}
      >
        <Menu />
      </button>

      <div className="crumb">
        Workspace <span>/</span> <b>{page}</b>
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Search size={18} />
        </button>

        <button className="icon-btn">
          <Bell size={18} />
          <i />
        </button>

        <div className="avatar small">M</div>
      </div>
    </header>
  );
}
