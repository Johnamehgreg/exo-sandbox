import Providers from '@/components/providers';
import { siteConfig } from '@/config/site';
import { twk } from '@/lib/fonts';
import '@mantine/carousel/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/tiptap/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import '../styles/index.scss';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} - %s`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={twk.className}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
        <NextTopLoader color="#0CAE5C" zIndex={1000} showSpinner={false} />
      </body>
    </html>
  );
}
