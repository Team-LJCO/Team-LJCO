/**
 * 한글 초성 검색 유틸리티
 */

const CHOSEONG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

/**
 * 문자열에서 초성만 추출
 * @param {string} str - 변환할 문자열
 * @returns {string} 초성 문자열
 */
export const getChoseong = (str) => {
  if (!str) return "";

  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) {
      result += CHOSEONG[Math.floor(code / 588)];
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};

/**
 * 초성 검색 매칭 여부 확인
 * @param {string} target - 검색 대상 문자열
 * @param {string} search - 검색어
 * @returns {boolean} 매칭 여부
 */
export const matchChoseong = (target, search) => {
  if (!target || !search) return false;
  const term = search.toLowerCase().trim();
  const targetLower = target.toLowerCase();
  return targetLower.includes(term) || getChoseong(target).includes(term);
};
