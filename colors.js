/**
 * ANSI color codes for terminal output.
 * Provides clean, production-grade colored output without external dependencies.
 */

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const GRAY = "\x1b[90m";
const BOLD = "\x1b[1m";

/**
 * Wraps text in green color for success messages.
 *
 * @param {string} text
 * @returns {string}
 */
export function success(text) {
  return `${GREEN}${text}${RESET}`;
}

/**
 * Wraps text in red color for error messages.
 *
 * @param {string} text
 * @returns {string}
 */
export function error(text) {
  return `${RED}${text}${RESET}`;
}

/**
 * Wraps text in yellow color for warning messages.
 *
 * @param {string} text
 * @returns {string}
 */
export function warning(text) {
  return `${YELLOW}${text}${RESET}`;
}

/**
 * Wraps text in blue color for info messages.
 *
 * @param {string} text
 * @returns {string}
 */
export function info(text) {
  return `${BLUE}${text}${RESET}`;
}

/**
 * Wraps text in gray color for secondary text.
 *
 * @param {string} text
 * @returns {string}
 */
export function secondary(text) {
  return `${GRAY}${text}${RESET}`;
}

/**
 * Wraps text in bold formatting.
 *
 * @param {string} text
 * @returns {string}
 */
export function bold(text) {
  return `${BOLD}${text}${RESET}`;
}
