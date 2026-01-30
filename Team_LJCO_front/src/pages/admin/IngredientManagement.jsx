/** @jsxImportSource @emotion/react */
import { useState, useMemo, useRef } from 'react';
import {
  useIngredientsQuery,
  useCategoriesQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} from '../../queries';
import {
  PageHeader,
  SearchBar,
  DataTable,
  Pagination,
  ConfirmModal,
  FormModal,
} from '../../components/common';
import { uploadImage } from '../../apis';
import * as S from '../../styles/pages/IngredientManagement.style';
import * as TableS from '../../styles/common/Table.style';
import * as ModalS from '../../styles/common/Modal.style';

const IngredientManagement = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  // 삭제 모달 상태
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    ingId: null,
    ingName: '',
  });

  // 추가 모달 상태
  const [addModal, setAddModal] = useState({
    isOpen: false,
    ingName: '',
    ingCatId: '',
    imgType: 'category',
    ingImgUrl: '',
  });

  // 수정 모달 상태
  const [editModal, setEditModal] = useState({
    isOpen: false,
    ingId: null,
    ingName: '',
    ingImgUrl: '',
  });

  // 이미지 업로드 상태
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // React Query 훅
  const ingredientsQuery = useIngredientsQuery();
  const categoriesQuery = useCategoriesQuery();

  const createMutation = useCreateIngredientMutation();
  const updateMutation = useUpdateIngredientMutation();
  const deleteMutation = useDeleteIngredientMutation();

  // 데이터 추출 (API 응답이 배열 또는 객체 형태일 수 있음)
  const getIngredientsArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.ingredients)) return data.ingredients;
    return [];
  };

  const categories = categoriesQuery.data || [];

  // 클라이언트 사이드 필터링 - 재료명 또는 카테고리명에 검색어 포함 여부
  const allIngredients = useMemo(() => {
    const ingredients = getIngredientsArray(ingredientsQuery.data);
    if (!searchTerm) return ingredients;
    return ingredients.filter((ing) => {
      const category = categories.find((cat) => cat.ingCatId === ing.ingCatId);
      const categoryName = category?.ingCatName || '';
      return (
        ing.ingName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [ingredientsQuery.data, searchTerm, categories]);

  const loading = ingredientsQuery.isLoading || ingredientsQuery.isFetching;

  // 클라이언트 사이드 페이지네이션
  const totalPages = Math.ceil(allIngredients.length / pagination.size);
  const currentPageData = useMemo(() => {
    const start = pagination.page * pagination.size;
    const end = start + pagination.size;
    return allIngredients.slice(start, end);
  }, [allIngredients, pagination.page, pagination.size]);

  // 재료 검색
  const handleSearch = () => {
    const term = inputValue.trim();
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  // 카테고리 변경
  const handleCategoryChange = async (ingId, newCatId, record) => {
    try {
      await updateMutation.mutateAsync({
        ingId,
        ingredientData: {
          ingName: record.ingName,
          ingCatId: parseInt(newCatId),
          ingImgUrl: record.ingImgUrl,
        },
      });
    } catch (error) {
      console.error('카테고리 변경 실패:', error);
      alert('카테고리 변경에 실패했습니다.');
    }
  };

  // 삭제 모달 열기/닫기
  const openDeleteModal = (ingId, ingName) => {
    setDeleteModal({ isOpen: true, ingId, ingName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, ingId: null, ingName: '' });
  };

  // 재료 삭제 확인
  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteModal.ingId);
      closeDeleteModal();
    } catch (error) {
      console.error('재료 삭제 실패:', error);
      alert('재료 삭제에 실패했습니다.');
    }
  };

  // 추가 모달 열기/닫기
  const openAddModal = () => {
    setAddModal({
      isOpen: true,
      ingName: '',
      ingCatId: categories.length > 0 ? categories[0].ingCatId : '',
      imgType: 'category',
      ingImgUrl: '',
    });
    setImagePreview(null);
  };

  const closeAddModal = () => {
    setAddModal({
      isOpen: false,
      ingName: '',
      ingCatId: '',
      imgType: 'category',
      ingImgUrl: '',
    });
    setImagePreview(null);
  };

  // 수정 모달 열기/닫기
  const openEditModal = (ingredient) => {
    setEditModal({
      isOpen: true,
      ingId: ingredient.ingId,
      ingName: ingredient.ingName,
      ingImgUrl: ingredient.ingImgUrl || '',
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      ingId: null,
      ingName: '',
      ingImgUrl: '',
    });
  };

  // 수정 모달 입력 변경
  const handleEditModalChange = (e) => {
    const { name, value } = e.target;
    setEditModal((prev) => ({ ...prev, [name]: value }));
  };

  // 재료 수정 확인
  const confirmEdit = async () => {
    if (!editModal.ingName.trim()) {
      alert('재료명을 입력해주세요.');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        ingId: editModal.ingId,
        ingredientData: {
          ingName: editModal.ingName,
          ingImgUrl: editModal.ingImgUrl || null,
        },
      });
      closeEditModal();
    } catch (error) {
      console.error('재료 수정 실패:', error);
      alert('재료 수정에 실패했습니다.');
    }
  };

  // 이미지 파일 업로드 처리
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 이미지 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setImageUploading(true);
    try {
      const result = await uploadImage(file);
      setAddModal((prev) => ({ ...prev, ingImgUrl: result.imageUrl }));
      setImagePreview({
        url: result.imageUrl,
        name: file.name,
      });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setImageUploading(false);
    }
  };

  // 이미지 미리보기 제거
  const handleRemoveImage = () => {
    setAddModal((prev) => ({ ...prev, ingImgUrl: '' }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 추가 모달 입력 변경
  const handleAddModalChange = (e) => {
    const { name, value } = e.target;
    setAddModal((prev) => ({ ...prev, [name]: value }));
  };

  // 선택한 카테고리의 이미지 URL 가져오기
  const getCategoryImgUrl = (catId) => {
    const category = categories.find((cat) => cat.ingCatId === parseInt(catId));
    return category ? category.ingCatImgUrl : null;
  };

  // 재료 추가 확인
  const confirmAdd = async () => {
    if (!addModal.ingName.trim()) {
      alert('재료명을 입력해주세요.');
      return;
    }
    if (!addModal.ingCatId) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    let imgUrl = null;
    if (addModal.imgType === 'category') {
      imgUrl = getCategoryImgUrl(addModal.ingCatId);
    } else if (addModal.imgType === 'upload' && addModal.ingImgUrl) {
      imgUrl = addModal.ingImgUrl;
    } else if (addModal.imgType === 'url' && addModal.ingImgUrl.trim()) {
      imgUrl = addModal.ingImgUrl.trim();
    }

    try {
      await createMutation.mutateAsync({
        ingName: addModal.ingName,
        ingCatId: parseInt(addModal.ingCatId),
        ingImgUrl: imgUrl,
      });
      closeAddModal();
    } catch (error) {
      console.error('재료 추가 실패:', error);
      alert('재료 추가에 실패했습니다.');
    }
  };

  // 페이지 변경
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // 초기화
  const handleReset = () => {
    setInputValue('');
    setSearchTerm('');
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  // 날짜 포맷
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dateString.split('T')[0];
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      key: 'ingId',
      title: '재료ID',
      dataIndex: 'ingId',
      render: (value) => <span css={TableS.tableId}>{value}</span>,
    },
    {
      key: 'ingImgUrl',
      title: '이미지',
      dataIndex: 'ingImgUrl',
      render: (value) => (
        <div css={S.ingImgCell}>
          {value ? (
            <img src={`http://localhost:8080/images/${value}`} alt="재료 이미지" css={S.ingImg} />
          ) : (
            <span css={S.noImage}>-</span>
          )}
        </div>
      ),
    },
    {
      key: 'ingName',
      title: '재료명',
      dataIndex: 'ingName',
      render: (value) => <span css={TableS.tableName}>{value}</span>,
    },
    {
      key: 'ingCatId',
      title: '카테고리',
      dataIndex: 'ingCatId',
      render: (value, record) => (
        <select
          css={TableS.tableSelect}
          value={value || ''}
          onChange={(e) => handleCategoryChange(record.ingId, e.target.value, record)}
          disabled={updateMutation.isPending}
        >
          {categories.map((cat) => (
            <option key={cat.ingCatId} value={cat.ingCatId}>
              {cat.ingCatName}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: 'edit',
      title: '수정',
      dataIndex: 'ingId',
      render: (value, record) => (
        <button
          css={S.editBtn}
          onClick={() => openEditModal(record)}
          disabled={updateMutation.isPending}
        >
          수정
        </button>
      ),
    },
    {
      key: 'actions',
      title: '삭제',
      dataIndex: 'ingId',
      render: (value, record) => (
        <button
          css={TableS.deleteBtn}
          onClick={() => openDeleteModal(value, record.ingName)}
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      ),
    },
  ];

  return (
    <div css={S.ingredientManagement}>
      <PageHeader title="재료 관리">
        <button css={S.addBtn} onClick={openAddModal}>
          재료 추가
        </button>
      </PageHeader>

      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSearch={handleSearch}
        onReset={handleReset}
        placeholder="재료 또는 카테고리 검색"
      />

      <DataTable
        columns={columns}
        data={currentPageData}
        loading={loading}
        rowKey="ingId"
        emptyMessage="재료가 없습니다."
      />

      <Pagination
        page={pagination.page + 1}
        totalPages={totalPages}
        onChange={(newPage) => handlePageChange(newPage - 1)}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="재료 삭제"
        message={`정말 '${deleteModal.ingName}' 재료를 삭제하시겠습니까?`}
        confirmText="삭제"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />

      {/* 재료 수정 모달 */}
      <FormModal
        isOpen={editModal.isOpen}
        title="재료 수정"
        confirmText="수정"
        onConfirm={confirmEdit}
        onCancel={closeEditModal}
      >
        <div css={ModalS.formGroup}>
          <label htmlFor="edit-ingName">재료명</label>
          <input
            type="text"
            id="edit-ingName"
            name="ingName"
            value={editModal.ingName}
            onChange={handleEditModalChange}
            placeholder="재료명 입력"
          />
        </div>
        <div css={ModalS.formGroup}>
          <label htmlFor="edit-ingImgUrl">이미지 URL</label>
          <input
            type="text"
            id="edit-ingImgUrl"
            name="ingImgUrl"
            value={editModal.ingImgUrl}
            onChange={handleEditModalChange}
            placeholder="이미지 URL 입력"
          />
        </div>
      </FormModal>

      {/* 재료 추가 모달 */}
      <FormModal
        isOpen={addModal.isOpen}
        title="재료 추가"
        confirmText="추가"
        onConfirm={confirmAdd}
        onCancel={closeAddModal}
      >
        <div css={ModalS.formGroup}>
          <label htmlFor="ingName">재료명</label>
          <input
            type="text"
            id="ingName"
            name="ingName"
            value={addModal.ingName}
            onChange={handleAddModalChange}
            placeholder="재료명 입력"
          />
        </div>
        <div css={ModalS.formGroup}>
          <label htmlFor="ingCatId">카테고리</label>
          <select
            id="ingCatId"
            name="ingCatId"
            value={addModal.ingCatId}
            onChange={handleAddModalChange}
          >
            {categories.map((cat) => (
              <option key={cat.ingCatId} value={cat.ingCatId}>
                {cat.ingCatName}
              </option>
            ))}
          </select>
        </div>
        <div css={ModalS.formGroup}>
          <label>이미지</label>
          <div css={ModalS.radioGroup}>
            <label css={ModalS.radioLabel}>
              <input
                type="radio"
                name="imgType"
                value="category"
                checked={addModal.imgType === 'category'}
                onChange={handleAddModalChange}
              />
              <span>카테고리 이미지 사용</span>
            </label>
            <label css={ModalS.radioLabel}>
              <input
                type="radio"
                name="imgType"
                value="upload"
                checked={addModal.imgType === 'upload'}
                onChange={handleAddModalChange}
              />
              <span>파일 업로드</span>
            </label>
            <label css={ModalS.radioLabel}>
              <input
                type="radio"
                name="imgType"
                value="url"
                checked={addModal.imgType === 'url'}
                onChange={handleAddModalChange}
              />
              <span>URL 직접 입력</span>
            </label>
          </div>
          {addModal.imgType === 'upload' && (
            <div css={ModalS.imageUploadContainer}>
              {!imagePreview ? (
                <div css={ModalS.imageUploadArea}>
                  <label css={ModalS.imageUploadLabel}>
                    <span css={ModalS.imageUploadIcon}>📷</span>
                    <span>{imageUploading ? '업로드 중...' : '클릭하여 이미지 선택'}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      css={ModalS.hiddenFileInput}
                    />
                  </label>
                </div>
              ) : (
                <div css={ModalS.imagePreviewContainer}>
                  <img src={imagePreview.url} alt="미리보기" css={ModalS.imagePreview} />
                  <div css={ModalS.imagePreviewInfo}>
                    <span>{imagePreview.name}</span>
                    <span>업로드 완료</span>
                  </div>
                  <button type="button" onClick={handleRemoveImage} css={ModalS.imageRemoveBtn}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
          {addModal.imgType === 'url' && (
            <input
              type="text"
              id="ingImgUrl"
              name="ingImgUrl"
              value={addModal.ingImgUrl}
              onChange={handleAddModalChange}
              placeholder="이미지 URL 입력"
              css={ModalS.urlInput}
            />
          )}
        </div>
      </FormModal>
    </div>
  );
};

export default IngredientManagement;
