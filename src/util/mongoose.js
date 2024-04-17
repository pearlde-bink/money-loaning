module.exports = {
    multipleMongooseToObject: function (mongooses) {
      return mongooses.map((mongoose) => mongoose.toObject());
    },
  
    singleMongooseToObject: function (mongoose) {
      return mongoose.toObject();
    },
  };
  