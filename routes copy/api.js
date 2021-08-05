const router = require("express").Router();
const { Workout } = require("../models");

router.get("/api/workouts", async (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration", },
      },
    },
  ])
    .then((workout_tracker) => {
      res.json(workout_tracker);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((workout_tracker) => {
      res.json(workout_tracker);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.put("/api/workouts/:id", ({body, params}, res) => {

  Workout.findByIdAndUpdate( params.id,
    { $push: {exercises: body}},
    { new: true, runValidators: true })
    .then((workout_tracker) => {
      res.json(workout_tracker);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.get("/api/workouts/range", async (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ _id: -1})
    .limit(7)
    .then((workout_tracker) => {
      res.json(workout_tracker);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.delete('/api/workouts',({ body }, res) =>{
  Workout.findByIdAndDelete(body.id)
  .then(() =>{
    res.json(true);
  })
  .catch((e) => {
    res.json(e);
  });
});


module.exports = router;
