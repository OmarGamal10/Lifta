/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import useHttp from "../../hooks/useHTTP";

const WorkoutHistory = ({ userId, view = true }) => {
  const [open, setOpen] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const { get, loading, error } = useHttp("http://localhost:3000");

  const fetchWorkouts = useCallback(async () => {
    if (!userId) return; // Guard clause for initial render

    try {
      let response;
      if (view) response = await get(`/workouts/log/${userId}`);
      //else response = await get(`/workouts/log/${userId}/trainer/${trainerId}`); //trainerId da el trainer el by3ml visit ya magdy
      setWorkouts(response.data.workoutLog);
      console.log(response.data.workoutLog);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  if (!userId) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading workouts</div>;

  const handleOpen = (value) => setOpen(open === value ? null : value);

  return (
    <div className="w-full max-w-[95vw] mx-auto p-6 text-textColor">
      <h2 className="text-2xl font-medium mb-8">Workout History</h2>
      <div className="space-y-4">
        {workouts.map((workout) => (
          <Accordion
            key={new Date(workout.date).getTime()}
            open={open === new Date(workout.date).getTime()}
            className="w-full border border-secondary rounded-lg overflow-hidden"
          >
            <AccordionHeader
              onClick={() => handleOpen(new Date(workout.date).getTime())}
              className={`w-full px-6 py-4 ${
                open === new Date(workout.date).getTime()
                  ? "bg-secondary bg-opacity-50"
                  : "hover:bg-[#5F3C68] hover:bg-opacity-50"
              }`}
            >
              <div className="flex justify-between w-full items-center">
                <h3 className="text-lg font-medium text-accent">
                  {workout.name}
                </h3>
                <div className="flex items-center gap-8">
                  <span className="text-lg">
                    {new Date(workout.date).toLocaleDateString()}
                  </span>
                  <span className="text-lg">
                    {workout.first_name} {workout.last_name}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm text-accent bg-secondary/20 
                      "
                  >
                    {workout.isDone ? "Completed" : "Not Completed"}
                  </span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody className="px-6 py-4 bg-backGroundColor/5">
              <div className="space-y-4">
                {workout.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 rounded-lg border border-secondary/50 hover:border-secondary transition-colors"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium">{exercise.name}</h3>
                      <span className="text-accent">
                        {exercise.musclegroup}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{exercise.description}</p>
                    <div className="flex gap-6 text-sm">
                      <span className="bg-secondary/30 px-3 py-1 rounded-full">
                        {exercise.sets} sets
                      </span>
                      <span className="bg-secondary/30 px-3 py-1 rounded-full">
                        {exercise.reps} reps
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;
