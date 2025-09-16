import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items = [] }: BreadcrumbsProps) => {
  if (items.length === 0) return null;

  return (
    <nav className="breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 && <span> / </span>}
            {item.link ? (
              <Link to={item.link}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};