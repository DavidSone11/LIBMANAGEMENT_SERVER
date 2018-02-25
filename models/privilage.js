var mongoose = require('mongoose');
var privilegeSchema = new mongoose.Schema({
    privilegeCode: {
        type: String,
        default: 'Dashboard'
        /*
          DASHBOARD,USERPLAN,USER,TRAIN etc
        */
    },
    default: {
        type: Boolean,
        default: false
    },
    Dashboard: {
        type: Boolean,
        default: true
    },
    UserPlan: {
        type: Boolean,
        default: true
    },
    Train: {
        type: Boolean,
        default: true
    },
    TrainStation: {
        type: Boolean,
        default: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});
var Privil = mongoose.model('privilege', privilegeSchema);
var p = new Privil();
p.privilegeCode = "USERPLAN";
p.save();
module.exports = Privil;