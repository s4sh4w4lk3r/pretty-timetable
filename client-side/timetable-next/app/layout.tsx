import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Nav from "@/components/nav/Nav";
import NavLinks from "@/components/nav/NavLinks";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "Pretty Timetable",
    description: "Удобное расписание",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Providers>
                    <Nav>
                        <NavLinks />
                    </Nav>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
