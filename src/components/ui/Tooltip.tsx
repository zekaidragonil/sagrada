import React from 'react';

interface TooltipProps {
    children: React.ReactNode;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    return (
        <div className="tooltip-container">
            {children}
            <span className="tooltip-text" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
};

export default Tooltip;