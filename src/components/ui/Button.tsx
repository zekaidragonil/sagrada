import React from 'react';
import ImageComponent from './ImageComponent';
import { ButtonProps } from '@/utils/types';
import Link from 'next/link';


const Button: React.FC<ButtonProps> = ({ text, link,  banner, footer, calendar, active, className, ...props }) => {
    return (
        <>
        {text && link ? (
          <Link href="#ticket" passHref className='d-flex justify-content-center'>
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
          </Link>
        ) : (
          <button className={banner ? `botton-banner ${active && 'active'} ${className}` : "thm_btn"} {...props}>
            {text ? <span dangerouslySetInnerHTML={{ __html: text }} /> : ' '}
            {!footer && !calendar && (
              <ImageComponent
                src='/images/icons/arrow-right.png'
                alt="icon"
                width={15}
                height={15}
              />
            )}
          </button>
        )}
      </>
      
    );
  };


export default Button;
