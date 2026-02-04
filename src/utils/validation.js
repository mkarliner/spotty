/**
 * Validation utilities for amateur radio callsigns and grid squares
 */

/**
 * Validates an amateur radio callsign
 * @param {string} callsign - The callsign to validate
 * @returns {boolean|string} - true if valid, error message if invalid
 */
export function validateCallsign(callsign) {
  if (!callsign || typeof callsign !== 'string') {
    return 'Callsign is required';
  }

  const trimmed = callsign.trim().toUpperCase();

  if (trimmed.length < 3 || trimmed.length > 12) {
    return 'Callsign must be 3-12 characters';
  }

  // Basic callsign pattern: alphanumeric with at least one number
  const callsignPattern = /^[A-Z0-9]+$/;
  if (!callsignPattern.test(trimmed)) {
    return 'Callsign must contain only letters and numbers';
  }

  // Must contain at least one number
  if (!/\d/.test(trimmed)) {
    return 'Callsign must contain at least one number';
  }

  // Must contain at least one letter
  if (!/[A-Z]/.test(trimmed)) {
    return 'Callsign must contain at least one letter';
  }

  return true;
}

/**
 * Validates a Maidenhead grid square locator
 * @param {string} grid - The grid square to validate
 * @returns {boolean|string} - true if valid, error message if invalid
 */
export function validateGridSquare(grid) {
  if (!grid || typeof grid !== 'string') {
    return 'Grid square is required';
  }

  const trimmed = grid.trim().toUpperCase();

  // Grid squares can be 4, 6, or 8 characters
  if (![4, 6, 8].includes(trimmed.length)) {
    return 'Grid square must be 4, 6, or 8 characters (e.g., IO91, IO91vl, IO91vl12)';
  }

  // Pattern: 2 letters, 2 digits, optionally 2 letters, optionally 2 digits
  // Examples: IO91, IO91vl, IO91vl12
  const patterns = {
    4: /^[A-R]{2}[0-9]{2}$/,
    6: /^[A-R]{2}[0-9]{2}[A-X]{2}$/,
    8: /^[A-R]{2}[0-9]{2}[A-X]{2}[0-9]{2}$/
  };

  const pattern = patterns[trimmed.length];
  if (!pattern.test(trimmed)) {
    if (trimmed.length === 4) {
      return 'Grid square format: 2 letters (A-R) + 2 digits (e.g., IO91)';
    } else if (trimmed.length === 6) {
      return 'Grid square format: 2 letters (A-R) + 2 digits + 2 letters (a-x) (e.g., IO91vl)';
    } else {
      return 'Grid square format: 2 letters (A-R) + 2 digits + 2 letters (a-x) + 2 digits (e.g., IO91vl12)';
    }
  }

  return true;
}

/**
 * Normalizes a callsign to uppercase
 * @param {string} callsign
 * @returns {string}
 */
export function normalizeCallsign(callsign) {
  return callsign?.trim().toUpperCase() || '';
}

/**
 * Normalizes a grid square to proper case (uppercase for first 4 chars, lowercase for extended)
 * @param {string} grid
 * @returns {string}
 */
export function normalizeGridSquare(grid) {
  if (!grid) return '';
  const trimmed = grid.trim();
  if (trimmed.length <= 4) {
    return trimmed.toUpperCase();
  } else if (trimmed.length === 6) {
    return trimmed.substring(0, 4).toUpperCase() + trimmed.substring(4, 6).toLowerCase();
  } else if (trimmed.length === 8) {
    return trimmed.substring(0, 4).toUpperCase() +
           trimmed.substring(4, 6).toLowerCase() +
           trimmed.substring(6, 8);
  }
  return trimmed;
}
