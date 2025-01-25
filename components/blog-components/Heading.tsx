import React from "react";

export const createHeadingComponent = (level: number): React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>> => {
  const HeadingComponent = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const sizeClasses = {
      1: 'text-4xl font-bold mb-4 mt-8',
      2: 'text-3xl font-semibold mb-3 mt-6',
      3: 'text-2xl font-medium mb-2 mt-4',
      4: 'text-xl font-medium mb-2 mt-3',
      5: 'text-lg font-medium mb-1 mt-2',
      6: 'text-base font-medium mb-1 mt-1'
    }[level];

    return React.createElement(`h${level}`, {
      ...props,
      className: `${sizeClasses} text-gray-900 dark:text-gray-100 ${props.className || ''}`
    });
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
};