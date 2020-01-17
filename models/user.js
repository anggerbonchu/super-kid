const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  resetToken: String,
  resetTokenExpiration: Date,
  kids: [
    {
      name: String,
      gender: String,
      birthday: Date
    }
  ]
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// userSchema.methods.addKid = function(kid) {
//   const updatedKids = [...this.kids];
//   updatedKids.push({
//     name: kid.name,
//     gender: kid.gender,
//     birthday: kid.birthday
//   });
//   this.kids = updatedKids;
//   return this.save();
// }

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
