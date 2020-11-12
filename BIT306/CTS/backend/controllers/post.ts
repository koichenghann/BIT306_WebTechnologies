exports.test = ( req, res, next ) => {
  console.log('test');
  res.status(201).json({message: 'test ran'});
}
