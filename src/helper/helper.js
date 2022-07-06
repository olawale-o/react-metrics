export const parseNumber = (value) => value.toLocaleString('en-US');

export const parseText = (value) => value.split('_').join(' ');

export const orderBy = (arr, options = {}) => {
  const data = [...arr];
  const { order, key } = options;
  if (order === 'asc') {
    if (key === 'id') {
      data.sort((a, b) => {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          return -1;
        }

        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }

    if (key === 'volume') {
      data.sort((a, b) => a.value[key] - b.value[key]);
    }
  }

  if (order === 'desc') {
    if (key === 'id') {
      data.sort((a, b) => {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          return 1;
        }

        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }

    if (key === 'volume') {
      data.sort((a, b) => b.value[key] - a.value[key]);
    }
  }
  return data;
};
