import type { FC, TableHTMLAttributes } from "react";
import React from "react";

export const CustomTable: FC<TableHTMLAttributes<HTMLTableElement>> = (props) => {
  return (
    <div className="overflow-x-auto my-6 rounded-lg shadow-sm border">
      <table {...props} className="w-full border-collapse bg-white dark:bg-gray-800">
        <tbody>
          {React.Children.map(props.children, (child) => (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 even:bg-gray-50/50 dark:even:bg-gray-800/50">
              {child}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};