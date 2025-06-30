import axiosInstance from './axiosinstance';

export const getProducts = async () => {
    const res = await axiosInstance.get('/products');
    return res.data.products;
}