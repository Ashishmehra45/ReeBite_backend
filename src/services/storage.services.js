const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function UploadFile(file, filename) {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: filename,
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload error:", err);
    throw err;
  }
}

module.exports = {
  UploadFile,
};
