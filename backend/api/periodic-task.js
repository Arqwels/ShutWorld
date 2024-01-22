const postVKController = require('../controllers/postVKController');

module.exports = async (req, res) => {
  try {
    await postVKController.savePost();
    console.log("Данные о постах ВК были получены!");
    res.status(200).send("Success");
  } catch (error) {
    console.error('⛔ Ошибка:', error);
    res.status(500).send("Internal Server Error");
  }
};
