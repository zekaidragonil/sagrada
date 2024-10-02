import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css'
import type { Metadata } from "next";
import React from 'react';
import initTranslations from "@/lib/i18n"
import { dir } from 'i18next';
import i18nConfig from "@/config/i18n.config";
import { APP_ICON, SEO_CONFIG } from "@/config/common.config";
import TranslationsProvider from "@/components/TranslationsProvider";
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  icons: {
    icon: APP_ICON,
    shortcut: APP_ICON,
  },
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

const i18nNamespaces = ['translation'];

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale}  dir={dir(locale)} suppressHydrationWarning>
      <GoogleTagManager gtmId={SEO_CONFIG.tagManager} />
      <body >
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
       
           {children}
      
        </TranslationsProvider>
      </body>
      {
        SEO_CONFIG.analytics.google !== "" && <Script src={`https://www.googletagmanager.com/gtm.js?id=${SEO_CONFIG.analytics.google}`} strategy="lazyOnload" />
      }
    </html>
  );
}
