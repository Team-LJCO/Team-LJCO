/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  useUsersQuery,
  useSearchUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from '../../queries';
import {
  PageHeader,
  SearchBar,
  DataTable,
  Pagination,
  ConfirmModal,
} from '../../components/common';
import * as S from '../../styles/pages/UserManagement.style';
import * as TableS from '../../styles/common/Table.style';

const UserManagement = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  // 삭제 모달 상태
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: null,
    username: '',
  });

  // 쿼리 파라미터
  const searchParams = {
    keyword: searchKeyword,
    page: pagination.page,
    size: pagination.size,
  };

  // React Query 훅
  const usersQuery = useUsersQuery(pagination.page, pagination.size, {
    enabled: !isSearching,
  });

  const searchQuery = useSearchUsersQuery(searchParams, {
    enabled: isSearching && !!searchKeyword,
  });

  const updateRoleMutation = useUpdateUserRoleMutation();
  const deleteMutation = useDeleteUserMutation();

  // 현재 활성화된 쿼리 데이터
  const activeQuery = isSearching ? searchQuery : usersQuery;
  const users = activeQuery.data?.content || activeQuery.data?.data || activeQuery.data || [];
  const totalPages = activeQuery.data?.totalPages || 0;
  const loading = activeQuery.isLoading || activeQuery.isFetching;

  // 사용자 검색
  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setIsSearching(false);
      setPagination((prev) => ({ ...prev, page: 0 }));
      return;
    }
    setIsSearching(true);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  // 역할 변경
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateRoleMutation.mutateAsync({ userId, role: newRole });
    } catch (error) {
      console.error('역할 변경 실패:', error);
      alert('역할 변경에 실패했습니다.');
    }
  };

  // 삭제 모달 열기/닫기
  const openDeleteModal = (userId, username) => {
    setDeleteModal({ isOpen: true, userId, username });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, userId: null, username: '' });
  };

  // 사용자 삭제 확인
  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteModal.userId);
      closeDeleteModal();
    } catch (error) {
      console.error('사용자 삭제 실패:', error);
      alert('사용자 삭제에 실패했습니다.');
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

  // 배지 스타일 매핑
  const getBadgeStyle = (provider) => {
    const providerLower = (provider || 'local').toLowerCase();
    switch (providerLower) {
      case 'google':
        return TableS.badgeGoogle;
      case 'kakao':
        return TableS.badgeKakao;
      case 'naver':
        return TableS.badgeNaver;
      default:
        return TableS.badgeLocal;
    }
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      key: 'userName',
      title: '사용자명',
      dataIndex: 'userName',
      render: (value) => <span css={TableS.tableName}>{value}</span>,
    },
    {
      key: 'oauth2Provider',
      title: '로그인경로',
      dataIndex: 'oauth2Provider',
      render: (value) => (
        <span css={getBadgeStyle(value)}>
          {(value || 'LOCAL').toUpperCase()}
        </span>
      ),
    },
    {
      key: 'userRole',
      title: '역할변경',
      dataIndex: 'userRole',
      render: (value, record) => (
        <select
          css={TableS.tableSelect}
          value={value}
          onChange={(e) => handleRoleChange(record.userId, e.target.value)}
          disabled={updateRoleMutation.isPending}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      ),
    },
    {
      key: 'actions',
      title: '삭제',
      dataIndex: 'userId',
      render: (value, record) => (
        <button
          css={TableS.deleteBtn}
          onClick={() => openDeleteModal(value, record.userName)}
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      ),
    },
  ];

  return (
    <div css={S.userManagement}>
      <PageHeader title="사용자 관리" />

      <SearchBar
        value={searchKeyword}
        onChange={setSearchKeyword}
        onSearch={handleSearch}
        onReset={handleReset}
        placeholder="사용자명 또는 로그인경로 검색"
      />

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        rowKey="userId"
        emptyMessage="사용자가 없습니다."
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="사용자 삭제"
        message={`정말 '${deleteModal.username}' 사용자를 삭제하시겠습니까?`}
        confirmText="삭제"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default UserManagement;
