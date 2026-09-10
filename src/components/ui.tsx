import type { ReactNode } from "react";

export function SectionHeading({ id, label, title, aside }: {
  id: string;
  label: string;
  title: string;
  aside?: ReactNode;
}) {
  return <div className="section-heading">
    <div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>
    {aside}
  </div>;
}

export function TextLines({ className = "", lines = 2 }: { className?: string; lines?: number }) {
  return <div className={`text-lines ${className}`} aria-hidden="true">
    {Array.from({ length: lines }, (_, index) => <span key={index} />)}
  </div>;
}
