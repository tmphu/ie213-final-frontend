import React from "react";
import { Desktop, Tablet, Mobile } from "../../HOC/Responsive";
import SignupPageDesktop from "./SignupPageDesktop";
import SignupPageTablet from "./SignupPageTablet";
import SignupPageMobile from "./SignupPageMobile";

export default function SignupPage() {
  return (
    <div>
      <Desktop>
        <SignupPageDesktop />
      </Desktop>
      <Tablet>
        <SignupPageTablet />
      </Tablet>
      <Mobile>
        <SignupPageMobile />
      </Mobile>
    </div>
  );
}
