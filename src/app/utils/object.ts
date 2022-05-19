export function omit(obj: Record<any, any>, keys: any[]) {
  if (!keys.length) {
    return obj;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keys.pop()]: omitted, ...rest } = obj;
  return omit(rest, keys);
}
