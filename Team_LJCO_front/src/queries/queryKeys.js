// 쿼리 키 팩토리 - 일관된 캐시 관리를 위해
export const queryKeys = {
  // 사용자 관련
  users: {
    all: ['users'],
    list: (params) => ['users', 'list', params],
    search: (params) => ['users', 'search', params],
  },

  // 재료 관련
  ingredients: {
    all: ['ingredients'],
    list: () => ['ingredients', 'list'],
    search: (keyword) => ['ingredients', 'search', keyword],
  },

  // 카테고리 관련
  categories: {
    all: ['categories'],
  },

  // 레시피 관련
  recipes: {
    all: ['recipes'],
    list: () => ['recipes', 'list'],
    search: (keyword) => ['recipes', 'search', keyword],
    detail: (rcpId) => ['recipes', 'detail', rcpId],
  },

  // 대시보드
  dashboard: {
    stats: ['dashboard', 'stats'],
  },
};
