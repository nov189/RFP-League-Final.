
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RFP | Rise Future Prospects",
  description: "The home of competitive Roblox leagues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
