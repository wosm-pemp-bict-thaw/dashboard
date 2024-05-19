import './globals.css';
import Navigation from './components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navigation />
        {children}
        <ToastContainer />
        </body>
        </html>
    );
}