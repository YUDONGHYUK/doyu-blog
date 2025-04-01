import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { ThemeProvider } from '../providers/theme-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doyu',
  description: 'https://doyu-blog.vercel.app',
  authors: [{ name: 'Doyu' }],
  creator: 'Doyu',
  publisher: 'Doyu',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="max-w-4xl mx-auto flex flex-col justify-between px-6 bg-bg text-text">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-[var(--main-height)] ">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
