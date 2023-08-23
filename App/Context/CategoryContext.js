import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
