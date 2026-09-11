import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA Empleado",
  description: "IA Empleado — empleados digitales con IA para procesos empresariales definidos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
