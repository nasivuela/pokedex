const urlToId = (url = '') => {
  const idRegExp = new RegExp('/[a-z0-9]+/[_a-z]+/([0-9]+)');
  const results = idRegExp.exec(url);
  return results && results.length >= 2
    ? parseInt(results[1], 10)
    : ''
};

export default urlToId;
