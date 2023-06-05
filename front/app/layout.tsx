import "@/styles/globals.css";
import Header from "@/components/header";

export const metadata = {
  title: "TOPTEN",
  description: "Play Room for TOPTEN",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
