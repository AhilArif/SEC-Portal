const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
},
  message: { 
    type: String, 
    required: true 
},
  type: { 
    type: String, 
    enum: ['accepted', 'rejected', 'otherValidStatus','closed'],
     default: 'info'
     },
  status: { 
    type: String, 
    enum: ['unread', 'read'], 
    default: 'unread' 
},
  createdAt: {
     type: Date, 
     default: Date.now 
    },
});

mongoose.model("Notification", notificationSchema);
