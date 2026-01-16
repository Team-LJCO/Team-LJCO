import axiosInstance from '../configs/axiosConfig';

// ============ 사용자 관리 ============
export const getAllUsers = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/admin/users', {
    params: { page, size },
  });
  return response.data;
};

export const searchUsers = async (params) => {
  const response = await axiosInstance.get('/admin/users/search', {
    params,
  });
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await axiosInstance.put(`/admin/users/${userId}/role`, {
    role,
  });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/admin/users/${userId}`);
  return response.data;
};

// ============ 재료 관리 ============
export const getAllIngredients = async () => {
  const response = await axiosInstance.get('/ingredients');
  return response.data;
};

export const searchIngredients = async (keyword) => {
  const response = await axiosInstance.get('/ingredients/search', {
    params: { keyword },
  });
  return response.data;
};

export const createIngredient = async (ingredientData) => {
  const response = await axiosInstance.post('/ingredients', ingredientData);
  return response.data;
};

export const updateIngredient = async (ingId, ingredientData) => {
  const response = await axiosInstance.put(`/ingredients/${ingId}`, ingredientData);
  return response.data;
};

export const deleteIngredient = async (ingId) => {
  const response = await axiosInstance.delete(`/ingredients/${ingId}`);
  return response.data;
};

// ============ 카테고리 ============
export const getAllCategories = async () => {
  const response = await axiosInstance.get('/ingredients/categories');
  return response.data;
};

// ============ 레시피 관리 ============
export const getAllRecipes = async () => {
  const response = await axiosInstance.get('/recipes');
  return response.data;
};

export const searchRecipes = async (keyword) => {
  const response = await axiosInstance.get('/recipes/search', {
    params: { keyword },
  });
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await axiosInstance.post('/recipes', recipeData);
  return response.data;
};

export const updateRecipe = async (rcpId, recipeData) => {
  const response = await axiosInstance.put(`/recipes/${rcpId}`, recipeData);
  return response.data;
};

export const deleteRecipe = async (rcpId) => {
  const response = await axiosInstance.delete(`/recipes/${rcpId}`);
  return response.data;
};

export const getRecipeById = async (rcpId) => {
  const response = await axiosInstance.get(`/recipes/${rcpId}`);
  return response.data;
};

// ============ 대시보드 ============
export const getDashboardStats = async () => {
  const response = await axiosInstance.get('/admin/dashboard/stats');
  return response.data;
};

// ============ 인증 ============
export const adminLogin = async (username, password) => {
  const response = await axiosInstance.post('/admin/login', {
    username,
    password,
  });
  return response.data;
};

export const getTestToken = async () => {
  const response = await axiosInstance.get('/admin/test-token');
  return response.data;
};

// ============ 이미지 업로드 ============
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
