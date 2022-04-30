const httpError = (res, e) => {
  console.log(e);
  res.status(500).json({error: 'Ha ocurrido un problema!'});
}

export { httpError };