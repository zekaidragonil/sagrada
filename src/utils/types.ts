import { ReactNode } from "react";
import { Resource } from 'i18next';

export type TranslationResources = {
    [lng: string]: {
      [namespace: string]: Record<string, string>;
    };
  };

  export interface TranslationsProviderProps {
    children: ReactNode;
    locale: string;
    namespaces: string[];
    resources: Resource;
  }

 export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    banner?: boolean;
    footer?: boolean;
    calendar?: boolean;
    active?: boolean;
    className?: string;
}

export interface ImageComponentProps {
  preview?: string;
  src: string; 
  alt?: string;
  className?: string;
  divStyleClass?: string; 
  bgColor?: string; 
  [key: string]: string | number | boolean | undefined;
}
