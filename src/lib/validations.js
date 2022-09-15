const ENGLISH_RegEx = /[a-zA-Z]+$/i;
const MAX_FILE_SIZE = 500000; // 512KB
const ARABIC_RegEx = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
const SUPPORTED_FORMATS = Object.freeze([
  "image/jpg",
  "image/jpeg",
  "image/png",
]);

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
