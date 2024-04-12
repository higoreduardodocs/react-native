import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    addresses: [
      {
        name: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        landmark: String,
        country: String,
        state: String,
        city: String,
        neighborhood: String,
        postalCode: String,
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true }
)

UserSchema.methods.setVerificationToken = async function () {
  this.verificationToken = crypto.randomBytes(20).toString('hex')
}
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, crypto.randomBytes(32).toString('hex'))
}

export default mongoose.model('User', UserSchema)
