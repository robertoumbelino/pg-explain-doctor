import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = "", title, description, icon }) => {
  return (
    <div className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md ${className}`}>
      {(title || description || icon) && (
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <div className="flex items-center gap-3">
             {icon && <div className="text-primary">{icon}</div>}
             <div className="space-y-1">
                {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
             </div>
          </div>
        </div>
      )}
      <div className="p-6 pt-2">{children}</div>
    </div>
  );
};
