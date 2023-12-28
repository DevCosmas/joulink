const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const tutorSchema = new schema({
    firstname: {
        type: String,
        required: [true, 'a tutor must have a name']
    },
    lastname: {
        type: String,
        required: [true, 'a tutor must have a name']
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    photo: String
})


tutorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    if (this.password === this.confirmPassword) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confirmPassword = undefined
    }
    else {
        throw new Error('password was not confirmed')
    }

})
tutorSchema.methods.isValidPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const tutorModel = mongoose.model('tutor', tutorSchema)
module.exports = {tutorModel}