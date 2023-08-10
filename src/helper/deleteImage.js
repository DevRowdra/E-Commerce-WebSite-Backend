const fs = require('fs').promises;

const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.error('user image were deleted');
  } catch (error) {
    console.error('user image dose not exist');
  }
};
module.exports = { deleteImage };
