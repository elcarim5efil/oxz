import { cloneDeep, isTypedArray, repeat } from 'lodash';
export default function _repeat(source: any, count: number) {
  let res: any = null;
  if (typeof source === 'object') {
    res = [];
    for (let i = 0; i < count; ++i) {
      res = res.concat(cloneDeep(source));
    }
  } else {
    res = repeat(`${source}`, count);
  }
  return res;
}