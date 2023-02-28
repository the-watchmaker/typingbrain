export const camelFieldToSnake = (obj: any) => {
  const newObj: any = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    newObj[newKey] = value;
  });

  return newObj;
};

export const snakeFieldToCamel = (obj: any) => {
  const newObj: any = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    newObj[newKey] = value;
  });

  return newObj;
};
