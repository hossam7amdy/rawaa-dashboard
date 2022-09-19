const ENGLISH_RegEx = /[a-zA-Z]+$/i;
const MAX_FILE_SIZE = 500000; // 512KB
const ARABIC_RegEx = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;
const USERNAME = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
const SUPPORTED_FORMATS = Object.freeze([
  "image/jpg",
  "image/jpeg",
  "image/png",
]);

export const VALIDATE_USERNAME = (username, len = 5) => {
  if (!username) {
    return "Required";
  }
  if (username.trim().length < len) {
    return `Username must be at least ${len} letters.`;
  }
  if (!USERNAME.test(username)) {
    return "Invalid username";
  }
};

export const VALIDATE_PASSWORD = (password, len = 6) => {
  if (!password) {
    return "Required";
  }
  if (password.trim().length < len) {
    return `Password must be at least ${len} letters.`;
  }
  if (!PASSWORD.test(password)) {
    return "Password must contains english letters and numbers";
  }
};

export const IMAGE_FILE = (file) => {
  if (file?.length > 0) {
    // Do nothing, we're editing.
    return;
  }
  if (!file) {
    return "Invalid Input";
  }
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return "Not supported format";
  }
  if (file.size > MAX_FILE_SIZE) {
    return `Large size. Must be less than ${MAX_FILE_SIZE}`;
  }
};

export const ARABIC_WORD = (word, len = 3) => {
  const trimed_word = word.trim();

  if (trimed_word.length === 0) {
    return "Invalid Input";
  }
  if (!ARABIC_RegEx.test(trimed_word)) {
    return "Only Arabic letters allowed.";
  }
  if (trimed_word.length < len) {
    return `Title must be at least ${len} letters.`;
  }
};

export const ENGLISH_WORD = (word, len = 3) => {
  const trimed_word = word.trim();

  if (trimed_word.length === 0) {
    return "Invalid Input";
  }
  if (!ENGLISH_RegEx.test(trimed_word)) {
    return "Only English letter allowed.";
  }
  if (trimed_word.length < len) {
    return `Title must be at least ${len} letters.`;
  }
};

export const RANGE_NUMBER = (num, min = 0, max = 0) => {
  if (min > num || num > max) {
    return `Number must be in range [${min} - ${max}]`;
  }
};
