const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

// add pre middleware to category schema
categorySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // remove the category from the categories array of each product that contains it
      await mongoose
        .model("Product")
        .updateMany(
          { categories: this._id },
          { $pull: { categories: this._id } }
        );

      next();
    } catch (err) {
      next(err);
    }
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
