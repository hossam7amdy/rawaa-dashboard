import { createContext, useState } from "react";

export const CategoryContext = createContext({
  categoryList: [],
  getCategoryList: (categoryList) => {},
  addNewCategory: (category) => {},
  editCategory: (category) => {},
  deleteCategory: (id) => {},
});

const CategoryProvider = (props) => {
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryListHandler = (categoryData) => {
    setCategoryList(categoryData);
  };

  const addCategoryHandler = (category) => {
    setCategoryList((prevState) => prevState.concat(category));
  };

  const editCategoryHandler = (category) => {
    setCategoryList((prevState) =>
      prevState.map((item) => (item.id === category.id ? category : item))
    );
  };

  const deleteCategoryHandler = (id) => {
    setCategoryList((prevState) => prevState.filter((item) => item.id !== id));
  };

  const categoryContext = {
    categoryList,
    editCategory: editCategoryHandler,
    addNewCategory: addCategoryHandler,
    deleteCategory: deleteCategoryHandler,
    getCategoryList: getCategoryListHandler,
  };
  return (
    <CategoryContext.Provider value={categoryContext}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
