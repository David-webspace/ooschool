import axiosInstance from "./axiosinstance";

// Login
export const login = async (email, password) => {
    const res = await axiosInstance.post("/login", {email, password});
    return res.data;
}

// Register
export const register = async (userData) => {
    const res = await axiosInstance.post("/register", userData);
    return res.data;
}

// Get current user (if you have an endpoint for this)
export const getCurrentUser = async () => {
    const res =await axiosInstance.get("/getCurrentUser");
    return res.data;
}