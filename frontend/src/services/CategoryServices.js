import axios from "axios";

// Get all categories.........
export const getAllCategories = async () => {
    const { data } = await axios.get('/categories');
    return data;
};

// Get category by id.......
export const getCategoryById = async (categoryId) => {
    const { data } = await axios.get(`/categories/${categoryId}`);
    return data;
};

// Create new category.......
export const createCategory = async (name, status) => {
    const { data } = await axios.post('/categories', {
        name,
        status
    });
    return data;
};

// Update the category.........
export const updateCategoryById = async (categoryId, name, status) => {
    const { data } = await axios.put(`/categories/${categoryId}`, {
        name,
        status
    });
    return data;
};

// Delete category........
export const deleteCategoryById = async (categoryId) => {
    const { data } = await axios.delete(`/categories/${categoryId}`);
    return data;
};