const Tesseract = require('tesseract.js');

/**
 * Extracts text from an image file using OCR.
 * @param {string} filePath - Absolute path to the image file.
 * @returns {Promise<string>} - Extracted text content.
 */
const extractTextFromImage = async (filePath) => {
  const { data } = await Tesseract.recognize(filePath, 'eng', {
    logger: (m) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[OCR] ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
      }
    },
  });
  return data.text;
};

module.exports = { extractTextFromImage };
