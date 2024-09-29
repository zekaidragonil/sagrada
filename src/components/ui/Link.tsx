import Link from 'next/link';

interface LinkComponentProps {
    href: string;
    children?: React.ReactNode;
    className?: string; 
    dangerouslySetInnerHTML: { __html: string; };
}

const LinkComponent = ({ href, children, ...props }: LinkComponentProps) => {
    // Filter out the extra attributes
    const { ...validProps } = props;
  
    return (
      <Link href={href} {...validProps}>
        {children}
      </Link>
    );
  };

export default LinkComponent
