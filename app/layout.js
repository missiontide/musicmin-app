import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Montserrat} from "@next/font/google";
import PlausibleProvider from "next-plausible";

const montserrat = Montserrat({
    subsets: ['latin'],
});

export default function RootLayout({
   // Layouts must accept a children prop.
   // This will be populated with nested layouts or pages
   children,
}) {
    return (
        <html lang="en">
            <PlausibleProvider domain="musicmin.app" />
            <body className={montserrat.className}>{children}</body>
        </html>
    );
}