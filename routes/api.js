const router = require("express").Router();
const { Workout } = require("../models");

// Creates workouts
router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
        .then((dbWorkout => {
            res.json(dbWorkout);
    }))
        .catch(err => {
            res.json(err);
        });
});

// Adds exercises
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate({_id: req.params.id}, { $push: {exercises: body}})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
})

// Gets last workout
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        { 
            $addFields:{
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
})

// Gets workout in range
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        { 
            $addFields:{
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .sort({day: -1})
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});