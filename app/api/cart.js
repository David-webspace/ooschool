import axiosInstance from "./axiosinstance";

//Get the current user's cart
export const getCart = async () => {
    const response = await axiosInstance.get('/cart');
    return response.data;
};

//Add an item to the cart
export const addToCart = async (item) => {
    const response = await axiosInstance.post('/cart', item);
    return response.data;
};

//Remove an item from the cart
export const removeFromCart = async (itemId) => {
    const response = await axiosInstance.delete(`/cart/${itemId}`);
    return response.data;
};