/**
 * Logging utility for the application
 * Only logs in development mode unless explicitly enabled
 */

const isDevelopment = process.env.NODE_ENV === 'development';

// Log levels
const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

// Current log level (can be changed at runtime)
let currentLogLevel = isDevelopment ? LogLevel.DEBUG : LogLevel.WARN;

/**
 * Set the current log level
 * @param {number} level - One of LogLevel values
 */
export function setLogLevel(level) {
  currentLogLevel = level;
}

/**
 * Get the current log level
 * @returns {number}
 */
export function getLogLevel() {
  return currentLogLevel;
}

/**
 * Format log prefix with timestamp and level
 */
function formatPrefix(level) {
  const timestamp = new Date().toISOString().substr(11, 12);
  return `[${timestamp}] [${level}]`;
}

/**
 * Debug level logging
 * @param {string} component - Component or module name
 * @param {...any} args - Arguments to log
 */
export function debug(component, ...args) {
  if (currentLogLevel <= LogLevel.DEBUG) {
    console.log(`${formatPrefix('DEBUG')} [${component}]`, ...args);
  }
}

/**
 * Info level logging
 * @param {string} component - Component or module name
 * @param {...any} args - Arguments to log
 */
export function info(component, ...args) {
  if (currentLogLevel <= LogLevel.INFO) {
    console.info(`${formatPrefix('INFO')} [${component}]`, ...args);
  }
}

/**
 * Warning level logging
 * @param {string} component - Component or module name
 * @param {...any} args - Arguments to log
 */
export function warn(component, ...args) {
  if (currentLogLevel <= LogLevel.WARN) {
    console.warn(`${formatPrefix('WARN')} [${component}]`, ...args);
  }
}

/**
 * Error level logging
 * @param {string} component - Component or module name
 * @param {...any} args - Arguments to log
 */
export function error(component, ...args) {
  if (currentLogLevel <= LogLevel.ERROR) {
    console.error(`${formatPrefix('ERROR')} [${component}]`, ...args);
  }
}

/**
 * Create a logger instance for a specific component
 * @param {string} component - Component or module name
 * @returns {Object} Logger instance with methods
 */
export function createLogger(component) {
  return {
    debug: (...args) => debug(component, ...args),
    info: (...args) => info(component, ...args),
    warn: (...args) => warn(component, ...args),
    error: (...args) => error(component, ...args),
  };
}

// Export log levels for external use
export { LogLevel };

// Default export with all methods
export default {
  debug,
  info,
  warn,
  error,
  createLogger,
  setLogLevel,
  getLogLevel,
  LogLevel,
};
