import React from "react";

export default function FooterDesktop({ footerArr }) {
  const renderFooterNav = () => {
    return footerArr.map((item, index) => {
      return (
        <div className="footer__nav" key={index}>
          <div className="footer__nav-title text-md font-bold">
            {item.navTitle}
          </div>
          <ul className="footer__nav-list">
            {item.navList.map((item, index) => {
              return (
                <li className="footer__nav-item" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className=" bg-gray-200">
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-4 gap-5 py-5">{renderFooterNav()}</div>
        <hr className="border-gray-400" />
        <div className="flex py-5 justify-between">
          <p>
            2023 UITbooking, Inc. All rights reserved. Quyền riêng tư, điều khoản,
            sơ đồ trang.
          </p>
          <p>Tiếng việt</p>
        </div>
      </div>
    </div>
  );
}
