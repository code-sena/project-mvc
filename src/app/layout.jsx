import '@/assets/css/globals.css';

export const metadata = {
  title: 'project-mvc',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
