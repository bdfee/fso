import { Request } from 'express';

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
} 

interface Report {
  target: number,
  dailyExercises: number[]
}

interface ExerciseRequestBody {
  target: string,
  dailyExercises: string[]
}

const isArrayOnlyNumbers = (array: number[]): boolean => {
  return array.every(item => typeof item === 'number');
};

export const parseExerciseBody = (req: Request): Report => {
  console.log(req.body);
  const { target, dailyExercises } = req.body as ExerciseRequestBody;
  let numbersArr;
  if (dailyExercises instanceof Array && target) {
    numbersArr = dailyExercises.map(char => +char);
  } else {
    throw new Error('parameters missing');
  } 
  if (!isNaN(Number(target)) && isArrayOnlyNumbers(numbersArr)) {
    return {
      target: Number(target),
      dailyExercises: numbersArr
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

export const calculateExcercises = (target: number, dailyExercises: number[]): Results => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day !== 0).length;
  const average = (dailyExercises.reduce((acc, num) => acc + num, 0) / periodLength);
  const success = average >= target;
  const rating = !success ? 1 : Math.ceil(trainingDays/target) === 1 ? 2 : 3;
  let ratingDescription = '';
  switch (rating) {
    case 1: {
      ratingDescription = "target not achieved";
      break;
    }
    case 2: {
      ratingDescription = "target met";
      break;
    }
    case 3: {
      ratingDescription = "target exceeded";
    }
  }

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