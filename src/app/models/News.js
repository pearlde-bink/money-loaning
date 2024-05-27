const moongoose = require("mongoose");
const schema = moongoose.Schema;
const ObjectId = schema.ObjectId;

const News = new schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  img: { type: String, require: true },
  preview: { type: String, require: true },
  created: { type: String, requrie: true },
  stt: { type: Number, require: true },
});

module.exports = moongoose.model("News", News);

/*
{
  "title": "Health Breakthrough",
  "content": "Scientists have discovered a new treatment that could potentially cure one of the most challenging diseases known to man.",
  "img": "https://example.com/images/health-breakthrough.jpg",
  "created": "1/1/1111",
  "preview": "skjdflkalfdjladjsflakdsfkjjjjjjjjjjjjjjjjadsfklasldfkjojfladmslfafa"
}
*/
