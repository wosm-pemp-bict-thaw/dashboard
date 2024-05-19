import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';

export const metadata = {
    title: 're-NFT',
    description: '',
};

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <Navigation />
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
