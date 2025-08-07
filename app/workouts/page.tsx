import { getWorkouts } from "@/app/actions/workouts";

export default async function Workouts() {
  const workouts = await getWorkouts();
  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map((workout: any) => (
        <div key={workout.id}>
          <h2>{workout.name}</h2>
          <p>{workout.description}</p>
        </div>
      ))}
    </div>
  );
}