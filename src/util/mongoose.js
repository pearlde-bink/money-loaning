module.exports = {
  multipleMongooseToObject: function (mongooses) {
    // Check if mongooses is an array
    if (!Array.isArray(mongooses)) {
      // If mongooses is not an array, return an empty array
      return [];
    }
    return mongooses.map((mongoose) => mongoose.toObject());
  },

  singleMongooseToObject: function (mongoose) {
    return mongoose.toObject();
  },
};
