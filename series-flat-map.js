const series = require('./series');


const seriesFlatMap = (items, fn) => {
  const isArray = typeof items.length === 'number';
  const results = isArray ? [] : {};

  const tasks = Object.keys(items).map(p => fn(items[p], p, items));
  return series(tasks).then((resultSets) => {
    for (const resultSet of resultSets) {
      if (resultSet) {
        isArray ? results.push(...resultSet) : Object.assign(results, resultSet);
      }
    }
    return results;
  });
};


module.exports = seriesFlatMap;
