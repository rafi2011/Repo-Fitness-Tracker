const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },

  exercise: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter your exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter your exercise name"
          
        },
        duration: {
          type: Number,
          required: "Enter yur exercise duration"
        },
        distance: {
          type: Number,
          
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        }
      }
    ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
