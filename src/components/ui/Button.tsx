import React from 'react';
import ImageComponent from './ImageComponent';
import { ButtonProps } from '@/utils/types';


const Button: React.FC<ButtonProps> = ({ text, banner, footer, calendar, active, className, ...props }) => {
    return (
        text && (
            <button className={banner ? `botton-banner ${active && 'active'} ${className}` : "thm_btn"} {...props}>
                <span dangerouslySetInnerHTML={{ __html: text }} />
                {!footer && !calendar && (
                    <ImageComponent
                        src='/images/icons/arrow-right.png'
                        alt="icon"
                        width={15}
                        height={15}
                    />
                )}
            </button>
        )
    );
}

export default Button;
