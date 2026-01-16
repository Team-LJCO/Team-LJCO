/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { s } from "./styles";
// 💡 요청하신 아이콘들을 불러옵니다.
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

function LoginPage() {
    const navigate = useNavigate();

    const handleNaverLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    };

    const handleDeveloping = (platform) => {
        alert(`${platform} 로그인은 현재 개발 중입니다! 🧊`);
    };

    return (
        <div css={s.wrapper}>
            <div css={s.container}>
                <button css={s.backBtn} onClick={() => navigate("/")}>
                    ◀ 돌아가기
                </button>

                <div css={s.loginCard}>
                    <h1 css={s.title}>간편 로그인</h1>
                    <p css={s.subTitle}>소셜 계정으로 간편하게 시작하세요</p>

                    <div css={s.btnList}>
                        {/* 💡 구글 아이콘 적용 */}
                        <button css={s.socialBtn} onClick={() => handleDeveloping("Google")}>
                            <FcGoogle size={30} />
                            Google로 계속하기
                        </button>

                        {/* 💡 네이버 아이콘 적용 */}
                        <button css={s.socialBtn} onClick={handleNaverLogin}>
                            <SiNaver size={20} color="#03C75A" />
                            Naver로 계속하기
                        </button>

                        {/* 💡 카카오 아이콘 적용 */}
                        <button css={s.socialBtn} onClick={() => handleDeveloping("Kakao")}>
                            <RiKakaoTalkFill size={30} color="#3C1E1E" />
                            Kakao로 계속하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;