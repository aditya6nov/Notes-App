const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/lion-595b40b75ba036ed117d858a.svg.svg",
    },
  },
  {
    timestamps: true,
  }
);

//setting up middleware to encrypt the password
userSchema.pre("save", async function (next) {
  //only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchpassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
} 

const User = mongoose.model("User", userSchema);
module.exports = User;
