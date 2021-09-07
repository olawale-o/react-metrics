const get = async (URI) => {
  const response = await fetch(URI);
  return response;
};

export default get;
