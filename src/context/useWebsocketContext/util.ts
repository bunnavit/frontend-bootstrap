import { z } from 'zod';

export const transformStringToObject = z.string().transform((val) => {
  try {
    return JSON.parse(val) as Object;
  } catch (error) {
    return val;
  }
});


