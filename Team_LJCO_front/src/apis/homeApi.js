import { api } from "../configs/axiosConfig";

/** [API]: 냉장고 재료 조회 */
export const getMyIngredients = () => api.get("/api/user/ingredients");

/** [API]: 재료 삭제 */
export const deleteUserIngredient = (userIngId) => api.delete(`/api/user/ingredients/${userIngId}`);
