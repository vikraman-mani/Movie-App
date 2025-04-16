import React from "react";
import { mobileNavigation } from "./Header";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <section className="lg:hidden h-14 bg-neutral-600 fixed bottom-0 w-full">
      <div className="flex items-center justify-between h-full">
        {mobileNavigation.map((item, index) => {
          return (
            <NavLink
              key={item.label + "mobile"}
              to={item.href}
              className={({ isActive }) =>
                `px-3 flex h-full items-center justify-center ${
                  isActive && "bg-neutral-500"
                }`
              }
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="text-sm">{item.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
