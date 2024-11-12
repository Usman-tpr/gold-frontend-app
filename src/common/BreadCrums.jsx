import React from "react";
import { useNavigate } from "react-router-dom";

function BreadCrums({ breadCrum }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      {/* <img src="/assets/icons/bar.svg" alt="" /> */}
      <svg
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-usetheme" // Apply the custom color as text color
      >
        <path
          d="M0 0.874239C0 0.41979 0.349576 0.0352564 0.838983 0.0352564H14.822C15.2765 0.0352564 15.661 0.41979 15.661 0.874239C15.661 1.36365 15.2765 1.71322 14.822 1.71322H0.838983C0.349576 1.71322 0 1.36365 0 0.874239ZM0 6.46746C0 6.01301 0.349576 5.62848 0.838983 5.62848H10.3475C10.8019 5.62848 11.1864 6.01301 11.1864 6.46746C11.1864 6.95687 10.8019 7.30644 10.3475 7.30644H0.838983C0.349576 7.30644 0 6.95687 0 6.46746ZM5.87288 12.8997H0.838983C0.349576 12.8997 0 12.5501 0 12.0607C0 11.6062 0.349576 11.2217 0.838983 11.2217H5.87288C6.32733 11.2217 6.71186 11.6062 6.71186 12.0607C6.71186 12.5501 6.32733 12.8997 5.87288 12.8997Z"
          fill="currentColor"
        />
      </svg>
      {breadCrum.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`cursor-pointer text-xs md:text-base ${
              index === breadCrum.length - 1
                ? "font-bold"
                : "text-[#828282] font-normal"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </span>
          {index !== breadCrum.length - 1 && (
            <img src="/assets/icons/forward-icon.svg" alt="" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BreadCrums;
