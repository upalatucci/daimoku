import { type AppType } from "next/app";
import RootLayout from "src/components/layout";
import "../styles/tailwind.css"



const MyApp: AppType = ({
  Component,
  pageProps,
}) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
