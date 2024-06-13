const globalError = (err, req, res, next) => {
  console.log("hawni famma error da5let lel global error", err)
  res.status(err.statusCode).json(err.message);
}


export default globalError