/*jshint sub:true*/
var mongoose = require('mongoose');
var UserPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    default: 'plan001',
    index: true
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
p.planName = "PLAN001";
p.save();
module.exports = userPlan;