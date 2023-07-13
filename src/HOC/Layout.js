import React from "react";
import Footer from "../Pages/Footer/Footer";
import Header from "../Pages/Header/Header";
import { useMediaQuery } from "react-responsive";

export default function Layout({ children }) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  return (
    <>
      <Header />
      <div
        style={{ paddingTop: isDesktop ? "80px" : isTablet ? "60px" : "40px" }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}
