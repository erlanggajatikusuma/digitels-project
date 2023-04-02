export const getProduct = (page: number, limit: number) => {
  const skip = page || 0;
  return fetch(`https://dummyjson.com/products?limit=26&skip=${skip}`).then(
    res => res.json(),
  );
};

export const searchProduct = (value: string) => {
  return fetch(`https://dummyjson.com/products/search?q=${value}`).then(res =>
    res.json(),
  );
};
