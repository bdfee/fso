import { Request } from "express";

interface HeightWeight {
  height: number,
  weight: number
}

export const parseBmiQuery = (req: Request): HeightWeight => {
    const { height, weight } = req.query;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
    } else {
      throw new Error(
      `malformed query - 
        ${
          Number(height) ? 
            `weight: ${weight}` : 
            Number(weight) ? 
            `height: ${height}` :
            `weight: ${weight} & height: ${height}`
        }
      ` 
    );}
};

export const calculateBmi = (height: number, weight: number) => {
  const bmi = (weight / height / height) * 10000;
    const message = bmi < 18.4 ? "below weight" :
      bmi > 25.0 ? "above weight" : "normal (healthy weight)";
    return message;
};
