import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({
    height,
    weight,
    bmi
  });
});

app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({
      error: 'paramaters missing'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const daily_exercises_num : Array<number> = daily_exercises.map((day: unknown) => Number(day));

  if (isNaN(Number(target)) || daily_exercises_num.some((day: number) => isNaN(day))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const exerciseResults = calculateExercises(daily_exercises_num, Number(target));
  return res.json(exerciseResults);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});