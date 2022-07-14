// @ts-check
/**
 * 예시1
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */

export function init(config) {
    return true;
}

/**
 * 예시2
 * @param {number} code 
 * @returns {number}
 */

export function exit(code) {
    /** @type {number} */ // 변수의 타입 지정하기
    let num = 1
    return code + num;
}