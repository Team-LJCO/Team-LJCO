/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { useLoginMutation } from '../../queries';
import * as S from '../../styles/pages/LoginPage.style';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const loginMutation = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        username: formData.username,
        password: formData.password,
      });
      const token = response.token;

      localStorage.setItem('adminToken', token);
      login(token, { username: formData.username, role: 'ADMIN' });
      navigate('/admin/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      console.error('로그인 에러:', err);
    }
  };

  return (
    <div css={S.loginPage}>
      <div css={S.loginContainer}>
        <div css={S.loginHeader}>
          <h1>관리자 로그인</h1>
          <p>관리자 계정으로 로그인해주세요</p>
        </div>

        <form css={S.loginForm} onSubmit={handleSubmit}>
          {error && <div css={S.loginError}>{error}</div>}

          <div css={S.formGroup}>
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디 입력"
              autoComplete="username"
            />
          </div>

          <div css={S.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" css={S.loginBtn} disabled={loginMutation.isPending}>
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
