import { css } from "@emotion/react";
import { checkeredBackground } from "../index.style";

export const adminLayout = css`
    display: flex;
    min-height: 100vh;
    ${checkeredBackground};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

export const adminMain = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
`;

export const adminContent = css`
    flex: 1;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
