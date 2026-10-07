import axios from "axios";

const api = axios.create({
    baseURL : "https://skill-square-api.runasp.net/api",
    withCredentials : true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/Admin/dashboard-stats");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch stats";
  }
};

export const getAllAdminBookings = async () => {
  try {
    const response = await api.get("/Admin/bookings");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch bookings";
  }
};

export const adminUpdateBookingStatus = async (id, status) => {
  try {
    const response = await api.put(`/Admin/bookings/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update status";
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get("/ServiceCategory");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch categories";
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/ServiceCategory", categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create category";
  }
};

// Update Category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/ServiceCategory/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update category";
  }
};

// Delete Category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/ServiceCategory/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete category";
  }
};

export const getAllProviders = async () => {
  try {
    const response = await api.get("/Admin/providers");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch providers";
  }
};

export const updateProviderStatus = async (id, isActive) => {
  try {
    const response = await api.put(`/Admin/providers/${id}/status?isActive=${isActive}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update status";
  }
};


export const getAllReviews = async () => {
  try {
    const response = await api.get("/Admin/reviews");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch reviews";
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.delete(`/Admin/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete review";
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await api.get("/Admin/customers");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch customers";
  }
};

// Generic status update (reusing the logic)
export const updateUserStatus = async (id, isActive) => {
  try {
    const response = await api.put(`/Admin/users/${id}/status?isActive=${isActive}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update status";
  }
};

export const getBookingDetails = async (id) => {
  try {
    const response = await api.get(`/Booking/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch booking details";
  }
};
export default api;