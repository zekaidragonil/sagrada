import { ReactNode } from 'react';

interface StackProps {
  children: ReactNode;
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  className?: string;
  [key: string]: unknown; 
}

export default function Stack({
  children,
  direction,
  justifyContent,
  alignItems,
  className,
  ...otherProps
}: StackProps) {
  return (
    <div
      className={`stack stack-${direction} justify-${justifyContent} align-${alignItems} ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
}
