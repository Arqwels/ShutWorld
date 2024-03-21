const Image = require("../models/imagesModel");

class imagesService {
  async uploadImage (dataFile) {
    try {
      const { originalname, buffer } = dataFile;

      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = originalname.substring(originalname.lastIndexOf('.')).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return {message: 'Расширение файла не подходит!'};
      }
      
      await Image.create({ filename: originalname, data: buffer });
    } catch (error) {
      console.error(error);
      return { message: 'Ошибка при загрузки файла' };
    }
  };
  
  async deleteImage (imageId) {
    if (!imageId) {
      return { error: 'Id фото не загруженно!' };
    }
    try {
      const resultDelete = await Image.destroy({ where: { id: imageId }})
      if (!resultDelete) {
        return { status: false, message: `Ошибка при удалении файла ${imageId}` };
      }
      return { status: true, message: `Фото ранга успешно удалён` };
    } catch (error) {
      return { status: false, message: `Ошибка при удалении файла ${imageId}`, error: error };
    }
  }
  
}

module.exports = new imagesService();