import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component for wayfinding.
 * Displays a list of linked breadcrumbs with "/" separators.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span className="text-muted">/</span>}
            {index === items.length - 1 ? (
              <span className="accent-gold">{item.name}</span>
            ) : (
              <Link
                to={item.path}
                className="hover:accent-gold transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
