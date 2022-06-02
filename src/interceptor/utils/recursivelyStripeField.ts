import { deniedFields } from '../deniedFields.constants';

export function recursivelyStripeField(data) {
  if (Array.isArray(data)) {
    return data.map(recursivelyStripeField);
  }

  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    return Object.keys(data)
      .filter((key) => !deniedFields.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: recursivelyStripeField(data[key]),
        }),
        {},
      );
  }
  return data;
}
