const get = async (URI) => {
  const response =  await fetch(URI);
  return await response.json();
};

export default get;
