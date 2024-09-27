const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true
    },
    eventdate: {
        type: Date, // Use Date type for date fields
        required: true
    },
    eventlocation: {
        type: String,
        required: true
    },
    budget: {
        type: Number, // Use Number type for budget
        required: true
    },
    expenses: {
        type: Number, // Use Number type for expenses
        required: true
    },
    revenue: {
        type: Number, // Use Number type for revenue
        required: true
    }
});

mongoose.model("Form", formSchema);
