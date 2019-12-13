const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
      birthday: Date,
    }
  ],
});

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email} )
  if (!user) {
      throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
      throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}
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

module.exports = mongoose.model('User', userSchema);
