const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const tutorSchema = new schema({
  firstname: {
    type: String,
    required: [true, 'a tutor must have a name'],
  },
  lastname: {
    type: String,
    required: [true, 'a tutor must have a name'],
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  photo: {
    type: String,
    default: 'hack-capital-uv5_bsypFUM-unsplash.jpg',
  },
  resetPasswordToken: String,
  resetTimeExp: Date,
});

tutorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    if (this.password === this.confirmPassword) {
      this.password = await bcrypt.hash(this.password, 12);
      this.confirmPassword = undefined;
      next(); 
    } else {
      throw new Error('Password was not confirmed');
    }
  });
  
tutorSchema.methods.isValidPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

tutorSchema.methods.createResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetTimeExp = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const tutorModel = mongoose.model('tutor', tutorSchema);
module.exports = { tutorModel };
