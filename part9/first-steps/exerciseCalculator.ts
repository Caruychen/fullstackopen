interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  rating: number,
  ratingDescription: string,
}

interface exerciseInputs {
  exerciseHours: Array<number>,
  target: number
}

const rater = (average: number, target: number): Rating => {
  switch (true) {
    case average < target - 1:
      return { rating: 1, ratingDescription: 'Not enough' };
    case average < target:
      return { rating: 2, ratingDescription: 'Not bad, but could improve' };
    default:
      return { rating: 3, ratingDescription: 'Well done, you are awesome' };
  }
};

const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.reduce((total, currentDay) => currentDay > 0 ? total + 1 : total, 0);
  const average = exerciseHours.reduce((total, currentDay) => total + currentDay) / exerciseHours.length;
  const success = average >= target;
  const { rating, ratingDescription } = rater(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseInputs = (args: Array<string>): exerciseInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseHours = args.slice(3).map(arg => Number(arg));
  const target = Number(args[2]);
  if (!isNaN(target) && exerciseHours.every(e => !isNaN(e))) {
    return {
      exerciseHours,
      target
    };
  } else {
    throw new Error('Inputs were not numbers');
  }
};


try {
  const { exerciseHours, target } = parseExerciseInputs(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error) {
  console.log('Oops, something went wrong:', error);
}