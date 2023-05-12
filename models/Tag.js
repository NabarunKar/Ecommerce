const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// add pre middleware to tag schema
tagSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // remove the tags from the tags array of each product that contains it
      await mongoose
        .model("Product")
        .updateMany({ tags: this._id }, { $pull: { tags: this._id } });

      next();
    } catch (err) {
      next(err);
    }
  }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
