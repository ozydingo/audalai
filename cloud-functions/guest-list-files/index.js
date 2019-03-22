/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  let files = [
    {index: 1, id: 1, name: 'lorem.mp3'},
    {index: 2, id: 2, name: 'ipsum.ogg'},
    {index: 3, id: 5, name: 'dolor.wav'},
  ];
  res.status(200).json(files);
};
