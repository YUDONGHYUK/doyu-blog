import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scheme-light dark:scheme-dark">
      <body className="max-w-5xl mx-auto flex flex-col justify-between">
        <Header />
        <main className="h-[var(--main-height)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
