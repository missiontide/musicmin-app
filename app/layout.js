import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Montserrat} from "@next/font/google";

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
        <body className={montserrat.className}>{children}</body>
        </html>
    );
}