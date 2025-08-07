// import { getWorkoutBySlug } from "@/app/actions/workouts";

export default async function Workout({ params }: { params: { slug: string } }) {
  // const workout = await getWorkoutBySlug(params.slug);
  const slug = await params.slug;
  console.log(slug);
  return (
    <div>
      {/* <h1>{workout?.name}</h1>
      <p>{workout?.description}</p>
      <p>{workout?.exercises.map((exercise: any) => exercise.name).join(", ")}</p> */}
    </div>
  );
}