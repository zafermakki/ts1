import { PackageSearch } from "lucide-react";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Product Explorer home">
          <span className="brand-icon">
            <PackageSearch size={23} />
          </span>

          <span className="brand-copy">
            <span className="brand-name">Product Explorer</span>
            <span className="brand-caption">
              Your catalog, simplified
            </span>
          </span>
        </a>

        <div className="header-right">
          <span className="header-status">
            <span className="status-dot" />
            Workspace
          </span>

          <div className="avatar" aria-label="User profile">
            PE
          </div>
        </div>
      </div>

      <div className="header-accent" />
    </header>
  );
}