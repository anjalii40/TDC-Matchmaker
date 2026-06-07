import "../styles/globals.css";

export const metadata = {
  title: "TDC Matchmaker Dashboard | The Dating Club",
  description: "Internal matchmaking workspace and client portfolio manager for the TDC team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
