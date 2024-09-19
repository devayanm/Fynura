import axios from "axios";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token); 
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axiosInstance.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axiosInstance.post("/projects", projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getUserProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};


export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axiosInstance.put(
      `/projects/${projectId}`,
      projectData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstance.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const addMentorship = async (mentorshipData) => {
  try {
    const response = await axiosInstance.post(
      "/mentorship/add-mentorship",
      mentorshipData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding mentorship:", error);
    throw error;
  }
};

export const getReviewsByProjectId = async (projectId) => {
  try {
    const response = await axios.get(`/api/reviews/${projectId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; 
  }
};

export const createPaymentIntent = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      "/payments/create-payment-intent",
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axiosInstance.post("/projects/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
