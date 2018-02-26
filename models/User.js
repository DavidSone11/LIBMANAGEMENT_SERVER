var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  userName: { type: String, default: 'hahaha',unique:true},
  firstName:{ type: String, default: 'hahaha' },
  lastName : { type: String, default: 'hahaha' },
  password: { type: String, default: 'hahaha',unique:true},
  roleCode: {type: Schema.Types.ObjectId, ref:'Role'},
  userPlanRef: {type: Schema.Types.ObjectId, ref:'Userplan'},
  age: { type: Number, min: 18, index: true,default:20},
  email: { type: String, default:'abc@gmail.com',unique:true },
  markDelete:{type:Boolean,default:false},
  createdTime: { type: Date, default: Date.now },

  });

  var User = module.exports = mongoose.model('User',UserSchema);

  var UserModel = new User();
  UserModel.userPlanRef = "5a93d2d9010d612d3c7af9ad";
  UserModel.save();
