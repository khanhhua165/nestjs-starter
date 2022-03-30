export function setIntersection(setA: Set<number>, setB: Set<number>) {
  let _intersection: Set<number> = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

export function setDifference(setA: Set<number>, setB: Set<number>) {
  let _difference: Set<number> = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

export function getAddAndDeleteIds(currentIds: number[], newIds: number[]) {
  const currentIdsSet = new Set(currentIds);
  const mergedArray = [...currentIds, ...newIds];
  const newArr = [...setDifference(new Set(mergedArray), currentIdsSet)];
  const toBeDeletedArr = [...setDifference(currentIdsSet, new Set(newIds))];
  return {
    newArr,
    toBeDeletedArr,
  };
}
