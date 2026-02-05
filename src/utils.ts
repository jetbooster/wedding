import { cloneDeep } from "lodash";

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

export const insert = <T>(arr:T[], index:number, newItem:T):T[] => {
  const newArr =cloneDeep(arr);
  newArr[index] = newItem;
  return newArr;
}