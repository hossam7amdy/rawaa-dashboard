const PHONE = /[0-9]+$/i;
const ENGLISH_RegEx = /[a-zA-Z0-9]+$/i;
const MAX_FILE_SIZE = 500000; // 512KB
const ARABIC_RegEx = /^[\u0621-\u064A\u0660-\u0669-/0-9 ]+$/i;
const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;
const USERNAME = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
const SUPPORTED_FORMATS = Object.freeze([
  "image/jpg",
  "image/jpeg",
  "image/png",
]);

export const VALIDATE_USERNAME = (username, min = 5, max = 100) => {
  if (!username) {
    return "Required";
  }
  if (username.trim().length < min) {
    return `Username must be at least ${min} letters.`;
  }
  if (!USERNAME.test(username)) {
    return "Invalid username";
  }
};

export const VALIDATE_PASSWORD = (password, min = 6, max = 100) => {
  if (!password) {
    return "Required";
  }
  if (password.trim().length < min) {
    return `Password must be at least ${min} letters.`;
  }
  if (password.length > max) {
    return "Password is too long.";
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

export const ARABIC_TEXT = (word, min = 3, max = 100) => {
  const trimed_text = word.trim();

  if (trimed_text.length === 0) {
    return "Invalid Input";
  }
  if (!ARABIC_RegEx.test(trimed_text)) {
    return "Only Arabic characters allowed.";
  }
  if (trimed_text.length < min) {
    return `Title must be at least ${min} characters.`;
  }
  if (trimed_text.length >= max) {
    return "Title is too long.";
  }
};

export const ENGLISH_TEXT = (word, min = 3, max = 100) => {
  const trimed_text = word.trim();

  if (trimed_text.length === 0) {
    return "Invalid Input";
  }
  if (!ENGLISH_RegEx.test(trimed_text)) {
    return "Only English characters allowed.";
  }
  if (trimed_text.length < min) {
    return `Title must be at least ${min} characters.`;
  }
  if (trimed_text.length > max) {
    return "Name is too long.";
  }
};

export const RANGE_NUMBER = (num, min = 0, max = 999) => {
  if (min > num || num > max) {
    return `Number must be in range [${min} - ${max}]`;
  }
};

export const VALIDATE_TEXT = (name, min = 5, max = 100) => {
  const trimed_name = name.trim();

  if (!trimed_name) {
    return "Invalid Name";
  }
  if (trimed_name.length < 5) {
    return `Name must be at least ${min} characters long.`;
  }
  if (trimed_name.length > max) {
    return "Name is too long.";
  }
};

export const PHONE_NUMBER = (number, min = 6, max = 13) => {
  if (!PHONE.test(number)) return "Invalid Input";
};
