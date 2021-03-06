const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    user_role: [
      {
        type: String,
        enum: ['guest', 'attendee', 'host'],
      },
    ],
    profile_image: {
      type: String,
    },
    cover_image: {
      type: String,
    },
    occupation: {
      type: String,
    },
    company_name: {
      type: String,
    },
    company_url: {
      type: String,
    },
    company_bio: {
      type: String,
    },
    username: {
      type: String,
    },
    bio: {
      type: String,
    },
    intro_video: {
      type: String,
    },
    categories: [
      {
        type: String,
      },
    ],
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    logo: {
      type: String,
    },
    residence: {
      type: String,
    },
    business_address: {
      type: String,
    },
    color: {
      type: String,
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdultContent: {
      type: Boolean,
      default: false,
    },
    facebook_url: {
      type: String,
    },
    twitter_url: {
      type: String,
    },
    youtube_url: {
      type: String,
    },
    instagram_url: {
      type: String,
    },
    twitch: {
      type: String,
    },
    stripe: {
      type: String,
    },
  },
  {timestamps: true}
);

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
