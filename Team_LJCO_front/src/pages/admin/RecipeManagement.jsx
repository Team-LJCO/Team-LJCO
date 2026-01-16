/** @jsxImportSource @emotion/react */
import { useState, useMemo, useRef } from 'react';
import {
  useRecipesQuery,
  useSearchRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useIngredientsQuery,
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
import * as S from '../../styles/pages/RecipeManagement.style';
import * as TableS from '../../styles/common/Table.style';
import * as ModalS from '../../styles/common/Modal.style';

const RecipeManagement = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  // 삭제 모달 상태
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    rcpId: null,
    rcpName: '',
  });

  // 추가 모달 상태
  const [addModal, setAddModal] = useState({
    isOpen: false,
    rcpName: '',
    rcpImgUrl: '',
    ingredients: [],
    steps: [],
  });

  // 수정 모달 상태
  const [editModal, setEditModal] = useState({
    isOpen: false,
    rcpId: null,
    rcpName: '',
    rcpImgUrl: '',
  });

  // 이미지 업로드 상태
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [stepImageUploading, setStepImageUploading] = useState({});
  const recipeImageRef = useRef(null);
  const stepImageRefs = useRef({});

  // React Query 훅
  const recipesQuery = useRecipesQuery({
    enabled: !isSearching,
  });

  const searchQuery = useSearchRecipesQuery(searchKeyword, {
    enabled: isSearching && !!searchKeyword,
  });

  const ingredientsQuery = useIngredientsQuery();

  const createMutation = useCreateRecipeMutation();
  const updateMutation = useUpdateRecipeMutation();
  const deleteMutation = useDeleteRecipeMutation();

  // 데이터 추출
  const allRecipes = isSearching
    ? (searchQuery.data || [])
    : (recipesQuery.data || []);
  const allIngredients = ingredientsQuery.data || [];
  const loading = recipesQuery.isLoading || searchQuery.isLoading || recipesQuery.isFetching;

  // 클라이언트 사이드 페이지네이션
  const totalPages = Math.ceil(allRecipes.length / pagination.size);
  const currentPageData = useMemo(() => {
    const start = pagination.page * pagination.size;
    const end = start + pagination.size;
    return allRecipes.slice(start, end);
  }, [allRecipes, pagination.page, pagination.size]);

  // 레시피 검색
  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setIsSearching(false);
      setPagination((prev) => ({ ...prev, page: 0 }));
      return;
    }
    setIsSearching(true);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  // 삭제 모달 열기/닫기
  const openDeleteModal = (rcpId, rcpName) => {
    setDeleteModal({ isOpen: true, rcpId, rcpName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, rcpId: null, rcpName: '' });
  };

  // 레시피 삭제 확인
  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteModal.rcpId);
      closeDeleteModal();
    } catch (error) {
      console.error('레시피 삭제 실패:', error);
      alert('레시피 삭제에 실패했습니다.');
    }
  };

  // 추가 모달 열기/닫기
  const openAddModal = () => {
    setAddModal({
      isOpen: true,
      rcpName: '',
      rcpImgUrl: '',
      ingredients: [{ ingId: '', rcpIngAmt: '', rcpIngOrd: 1 }],
      steps: [{ stepNo: 1, stepDesc: '', stepImgUrl: '' }],
    });
    setImagePreview(null);
    stepImageRefs.current = {};
  };

  const closeAddModal = () => {
    setAddModal({
      isOpen: false,
      rcpName: '',
      rcpImgUrl: '',
      ingredients: [],
      steps: [],
    });
    setImagePreview(null);
    stepImageRefs.current = {};
  };

  // 레시피 대표 이미지 업로드 처리
  const handleRecipeImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setImageUploading(true);
    try {
      const result = await uploadImage(file);
      setAddModal((prev) => ({ ...prev, rcpImgUrl: result.imageUrl }));
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

  // 레시피 대표 이미지 제거
  const handleRemoveRecipeImage = () => {
    setAddModal((prev) => ({ ...prev, rcpImgUrl: '' }));
    setImagePreview(null);
    if (recipeImageRef.current) {
      recipeImageRef.current.value = '';
    }
  };

  // 조리 단계 이미지 업로드 처리
  const handleStepImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setStepImageUploading((prev) => ({ ...prev, [index]: true }));
    try {
      const result = await uploadImage(file);
      handleStepChange(index, 'stepImgUrl', result.imageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setStepImageUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  // 조리 단계 이미지 제거
  const handleRemoveStepImage = (index) => {
    handleStepChange(index, 'stepImgUrl', '');
    if (stepImageRefs.current[index]) {
      stepImageRefs.current[index].value = '';
    }
  };

  // 수정 모달 열기/닫기
  const openEditModal = (recipe) => {
    setEditModal({
      isOpen: true,
      rcpId: recipe.rcpId,
      rcpName: recipe.rcpName,
      rcpImgUrl: recipe.rcpImgUrl || '',
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      rcpId: null,
      rcpName: '',
      rcpImgUrl: '',
    });
  };

  // 추가 모달 입력 변경
  const handleAddModalChange = (e) => {
    const { name, value } = e.target;
    setAddModal((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 모달 입력 변경
  const handleEditModalChange = (e) => {
    const { name, value } = e.target;
    setEditModal((prev) => ({ ...prev, [name]: value }));
  };

  // 재료 추가
  const addIngredientField = () => {
    setAddModal((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { ingId: '', rcpIngAmt: '', rcpIngOrd: prev.ingredients.length + 1 },
      ],
    }));
  };

  // 재료 삭제
  const removeIngredientField = (index) => {
    setAddModal((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // 재료 변경
  const handleIngredientChange = (index, field, value) => {
    setAddModal((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  // 조리 단계 추가
  const addStepField = () => {
    setAddModal((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        { stepNo: prev.steps.length + 1, stepDesc: '', stepImgUrl: '' },
      ],
    }));
  };

  // 조리 단계 삭제
  const removeStepField = (index) => {
    setAddModal((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  // 조리 단계 변경
  const handleStepChange = (index, field, value) => {
    setAddModal((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    }));
  };

  // 레시피 추가 확인
  const confirmAdd = async () => {
    if (!addModal.rcpName.trim()) {
      alert('레시피명을 입력해주세요.');
      return;
    }

    const validIngredients = addModal.ingredients.filter(
      (ing) => ing.ingId && ing.rcpIngAmt
    );
    const validSteps = addModal.steps.filter((step) => step.stepDesc.trim());

    try {
      await createMutation.mutateAsync({
        rcpName: addModal.rcpName,
        rcpImgUrl: addModal.rcpImgUrl || null,
        ingredients: validIngredients.map((ing, idx) => ({
          ingId: parseInt(ing.ingId),
          rcpIngAmt: ing.rcpIngAmt,
          rcpIngOrd: idx + 1,
        })),
        steps: validSteps.map((step, idx) => ({
          stepNo: idx + 1,
          stepDesc: step.stepDesc,
          stepImgUrl: step.stepImgUrl || null,
        })),
      });
      closeAddModal();
    } catch (error) {
      console.error('레시피 추가 실패:', error);
      alert('레시피 추가에 실패했습니다.');
    }
  };

  // 레시피 수정 확인
  const confirmEdit = async () => {
    if (!editModal.rcpName.trim()) {
      alert('레시피명을 입력해주세요.');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        rcpId: editModal.rcpId,
        recipeData: {
          rcpName: editModal.rcpName,
          rcpImgUrl: editModal.rcpImgUrl || null,
        },
      });
      closeEditModal();
    } catch (error) {
      console.error('레시피 수정 실패:', error);
      alert('레시피 수정에 실패했습니다.');
    }
  };

  // 페이지 변경
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // 초기화
  const handleReset = () => {
    setSearchKeyword('');
    setIsSearching(false);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  // 날짜 포맷
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dateString.split('T')[0];
  };

  // 난이도 표시 (숫자로)
  const renderLevel = (level) => {
    if (!level && level !== 0) return '-';
    return level;
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      key: 'rcpId',
      title: '레시피ID',
      dataIndex: 'rcpId',
      render: (value) => <span css={TableS.tableId}>{value}</span>,
    },
    {
      key: 'rcpImgUrl',
      title: '이미지',
      dataIndex: 'rcpImgUrl',
      render: (value) => (
        <div css={S.recipeImgCell}>
          {value ? (
            <img src={value} alt="레시피 이미지" css={S.recipeImg} />
          ) : (
            <span css={S.noImage}>-</span>
          )}
        </div>
      ),
    },
    {
      key: 'rcpName',
      title: '레시피명',
      dataIndex: 'rcpName',
      render: (value) => <span css={TableS.tableName}>{value}</span>,
    },
    {
      key: 'level',
      title: '난이도',
      dataIndex: 'level',
      render: (value) => <span css={S.levelBadge}>{renderLevel(value)}</span>,
    },
    {
      key: 'rcpViewCount',
      title: '조회수',
      dataIndex: 'rcpViewCount',
      render: (value) => <span css={S.viewCount}>{value?.toLocaleString() || 0}</span>,
    },
    {
      key: 'createdAt',
      title: '생성일자',
      dataIndex: 'createdAt',
      render: (value) => <span css={TableS.tableDate}>{formatDate(value)}</span>,
    },
    {
      key: 'edit',
      title: '수정',
      dataIndex: 'rcpId',
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
      dataIndex: 'rcpId',
      render: (value, record) => (
        <button
          css={TableS.deleteBtn}
          onClick={() => openDeleteModal(value, record.rcpName)}
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      ),
    },
  ];

  return (
    <div css={S.recipeManagement}>
      <PageHeader title="레시피 관리">
        <button css={S.addBtn} onClick={openAddModal}>
          레시피 추가
        </button>
      </PageHeader>

      <SearchBar
        value={searchKeyword}
        onChange={setSearchKeyword}
        onSearch={handleSearch}
        onReset={handleReset}
        placeholder="레시피명 검색"
      />

      <DataTable
        columns={columns}
        data={currentPageData}
        loading={loading}
        rowKey="rcpId"
        emptyMessage="레시피가 없습니다."
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="레시피 삭제"
        message={`정말 '${deleteModal.rcpName}' 레시피를 삭제하시겠습니까?`}
        confirmText="삭제"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />

      {/* 레시피 추가 모달 */}
      <FormModal
        isOpen={addModal.isOpen}
        title="레시피 추가"
        confirmText="추가"
        onConfirm={confirmAdd}
        onCancel={closeAddModal}
        width="600px"
      >
        <div css={ModalS.formGroup}>
          <label htmlFor="rcpName">레시피명 *</label>
          <input
            type="text"
            id="rcpName"
            name="rcpName"
            value={addModal.rcpName}
            onChange={handleAddModalChange}
            placeholder="레시피명 입력"
          />
        </div>
        <div css={ModalS.formGroup}>
          <label>대표 이미지</label>
          <div css={ModalS.imageUploadContainer}>
            {!imagePreview ? (
              <div css={ModalS.imageUploadArea}>
                <label css={ModalS.imageUploadLabel}>
                  <span css={ModalS.imageUploadIcon}>📷</span>
                  <span>{imageUploading ? '업로드 중...' : '클릭하여 이미지 선택'}</span>
                  <input
                    ref={recipeImageRef}
                    type="file"
                    accept="image/*"
                    onChange={handleRecipeImageUpload}
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
                <button type="button" onClick={handleRemoveRecipeImage} css={ModalS.imageRemoveBtn}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 재료 섹션 */}
        <div css={S.sectionHeader}>
          <label>재료</label>
          <button type="button" css={S.addFieldBtn} onClick={addIngredientField}>
            + 재료 추가
          </button>
        </div>
        <div css={S.scrollableSection}>
          {addModal.ingredients.map((ing, index) => (
            <div key={index} css={S.dynamicFieldRow}>
              <select
                value={ing.ingId}
                onChange={(e) => handleIngredientChange(index, 'ingId', e.target.value)}
                css={S.fieldSelect}
              >
                <option value="">재료 선택</option>
                {allIngredients.map((item) => (
                  <option key={item.ingId} value={item.ingId}>
                    {item.ingName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={ing.rcpIngAmt}
                onChange={(e) => handleIngredientChange(index, 'rcpIngAmt', e.target.value)}
                placeholder="용량 (예: 100g)"
                css={S.fieldInput}
              />
              <button
                type="button"
                css={S.removeFieldBtn}
                onClick={() => removeIngredientField(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* 조리 단계 섹션 */}
        <div css={S.sectionHeader}>
          <label>조리 단계</label>
          <button type="button" css={S.addFieldBtn} onClick={addStepField}>
            + 단계 추가
          </button>
        </div>
        <div css={S.scrollableStepsSection}>
          {addModal.steps.map((step, index) => (
            <div key={index} css={S.stepFieldRow}>
              <span css={S.stepNumber}>{index + 1}</span>
              <div css={S.stepInputs}>
                <textarea
                  value={step.stepDesc}
                  onChange={(e) => handleStepChange(index, 'stepDesc', e.target.value)}
                  placeholder="조리 방법을 입력하세요"
                  css={S.stepTextarea}
                />
                <div css={S.stepImageUpload}>
                  {!step.stepImgUrl ? (
                    <label css={S.stepImageUploadLabel}>
                      <span>{stepImageUploading[index] ? '업로드 중...' : '📷 이미지 추가'}</span>
                      <input
                        ref={(el) => (stepImageRefs.current[index] = el)}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleStepImageUpload(index, e)}
                        disabled={stepImageUploading[index]}
                        css={ModalS.hiddenFileInput}
                      />
                    </label>
                  ) : (
                    <div css={S.stepImagePreview}>
                      <img src={step.stepImgUrl} alt={`단계 ${index + 1}`} />
                      <button type="button" onClick={() => handleRemoveStepImage(index)}>
                        X
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                css={S.removeFieldBtn}
                onClick={() => removeStepField(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </FormModal>

      {/* 레시피 수정 모달 */}
      <FormModal
        isOpen={editModal.isOpen}
        title="레시피 수정"
        confirmText="수정"
        onConfirm={confirmEdit}
        onCancel={closeEditModal}
      >
        <div css={ModalS.formGroup}>
          <label htmlFor="edit-rcpName">레시피명</label>
          <input
            type="text"
            id="edit-rcpName"
            name="rcpName"
            value={editModal.rcpName}
            onChange={handleEditModalChange}
            placeholder="레시피명 입력"
          />
        </div>
        <div css={ModalS.formGroup}>
          <label htmlFor="edit-rcpImgUrl">이미지 URL</label>
          <input
            type="text"
            id="edit-rcpImgUrl"
            name="rcpImgUrl"
            value={editModal.rcpImgUrl}
            onChange={handleEditModalChange}
            placeholder="이미지 URL 입력"
          />
        </div>
      </FormModal>
    </div>
  );
};

export default RecipeManagement;
