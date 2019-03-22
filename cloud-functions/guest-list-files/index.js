/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
function CORS_preflight(req, res) {
  // Send response to OPTIONS requests
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  res.status(204).send('');
}

function listFiles(req, res) {
  const files = [
    {index: 1, id: 1, name: 'lorem.mp3'},
    {index: 2, id: 2, name: 'ipsum.ogg'},
    {index: 3, id: 5, name: 'dolor.wav'},
  ];
  // Set CORS headers for the main request
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(files);
}

exports.handler = (req, res) => {

  if (req.method === 'OPTIONS') {
    CORS_preflight(req, res);
  } else {
    listFiles(req, res);
  }
}
