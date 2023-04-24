// SQUARE kilometers to miles, returns string
export const kmToMiles = km =>
  Number((km * 0.386102).toFixed(1)).toLocaleString('en-US')

// returns string
export const kelvinToFahrenheit = k =>
    ((k - 273.15) * 9/5 + 32).toFixed(1)

// meters per second -> miles per hour, returns string
export const mpsToMph = ms =>
    (ms * 2.23694).toFixed(1)
