const get = async (URI) => {
  try {
    const response = await fetch(URI);
    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default get;
