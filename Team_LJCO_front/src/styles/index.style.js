import { css } from "@emotion/react";

// 글로벌 스타일
export const globalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #FFB3A7;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #FF5722;
    }

    button {
        font-family: inherit;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    input,
    select,
    textarea {
        font-family: inherit;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;

// 공통 색상 테마
export const colors = {
    primary: "#FF5722",
    primaryHover: "#E64A19",
    primaryLight: "#FF7043",
    accent: "#FFB3A7",
    background: "#ffe0e0",
    white: "#ffffff",
    gray: {
        50: "#f5f5f5",
        100: "#f0f0f0",
        200: "#e0e0e0",
        300: "#ddd",
        400: "#ccc",
        500: "#9e9e9e",
        600: "#757575",
        700: "#666",
        800: "#333",
    },
    success: "#4CAF50",
    successHover: "#43A047",
    danger: "#f44336",
    dangerHover: "#D32F2F",
    kakao: "#FEE500",
    naver: "#03C75A",
};

// 공통 배경 패턴 (핑크 체크무늬)
export const checkeredBackground = css`
    background-color: ${colors.background};
    background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(255, 179, 167, 0.3) 20px,
        rgba(255, 179, 167, 0.3) 21px
    ),
    repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(255, 179, 167, 0.3) 20px,
        rgba(255, 179, 167, 0.3) 21px
    );
`;
