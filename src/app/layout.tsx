import { ThirdwebProvider } from "thirdweb/react";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const value = {
    cssTransition: true,
    unstyled: false 
  };
  return (
    <html >
      <body >
      <PrimeReactProvider value={value}>
        <ThirdwebProvider >{children}</ThirdwebProvider>
        </PrimeReactProvider>
      </body>
    </html>
  ); 
}


