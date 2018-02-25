var mongoose = require('mongoose');
var RoleSchema = new mongoose.Schema({
  name: { type: String, default: 'admin',index:true },
  privilage: {type: mongoose.Schema.Types.ObjectId, ref:'privilege'},
  markDelete:{type:Boolean,default:false},
  createdTime: { type: Date, default: Date.now }

  });

  module.exports = mongoose.model('Role',RoleSchema);