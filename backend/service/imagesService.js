const Image = require("../models/imagesModel");


class imagesService {
  async uploadImage (dataFile) {
    try {
      const { originalname, buffer } = dataFile;

      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = originalname.substring(originalname.lastIndexOf('.')).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ status: false, message: 'Расширение файла не подходит!'});
      }

      const img = await Image.create({ filename: originalname, data: buffer });
      console.log(img);

      return img;

      // const imageId = await Image
    } catch (error) {
      
    }
  };
  
  async deleteImage (imageId) {
    if (!imageId) {
      return { error: 'Id фото не загруженно!' };
    }
    try {
      const resultDelete = await Image.destroy({ where: { id: imageId }})
      if (!resultDelete) {
        return { success: false, message: `Ошибка при удалении файла ${imageId}` };
      }
      return { success: true, message: `Фото ранга успешно удалён` };
    } catch (error) {
      return { success: false, message: `Ошибка при удалении файла ${imageId}`, error: error };
    }
  }
  
}

module.exports = new imagesService();