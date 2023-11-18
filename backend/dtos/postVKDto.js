module.exports = class postVKDto {
  postId;
  title;
  text;
  date;
  constructor(model) {
    this.idPost = model.postId;
    this.titlePost = model.title;
    this.textPost = model.text;
    this.datePost = model.date;
  }
};