interface bmiInputs {
  height: number
  weight: number
}

const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100
  const bmi = weight / (heightMeters * heightMeters)
  switch (true) {
    case bmi < 18.5:
      return 'Underweight'
    case bmi < 25:
      return 'Normal (healthy weight)'
    case bmi < 30:
      return 'Overweight'
    default:
      return 'Obese'
  }
}

const parseBmiInputs = (args: Array<string>): bmiInputs => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }
  else {
    throw new Error('Inputs were not numbers')
  }
}

try {
  const { height, weight } = parseBmiInputs(process.argv)
  console.log(calculateBmi(height, weight))
}
catch (error) {
  console.log('Oops, something went wrong:', error.message)
}
