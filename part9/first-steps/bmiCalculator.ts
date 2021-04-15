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

console.log(calculateBmi(180, 74))