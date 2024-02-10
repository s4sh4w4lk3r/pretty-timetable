import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "Pretty Timetable",
    description: "Удобное расписание",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
