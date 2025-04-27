// utils/classNames.js
export const classNames = (...args) => {
    return args
      .filter(Boolean) // Removes falsy values (like undefined, null, false, 0, or empty strings)
      .join(" "); // Joins all truthy values with a space
  };
  