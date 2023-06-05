import "./globals.css";

export const metadata = {
  title: "TOPTEN",
  description: "Play Room for TOPTEN",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
