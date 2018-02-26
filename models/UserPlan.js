/*jshint sub:true*/
var mongoose = require('mongoose');
var UserPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    default: 'plan001',
    index: true
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  markDelete: {
    type: Boolean,
    default: false
  },


});

var userPlan = mongoose.model('Userplan', UserPlanSchema);
var p = new userPlan();
p.planName = "USERPLAN001";
p.userRef = "5a91641d3c7a124134483fed",
p.save();
module.exports = userPlan;