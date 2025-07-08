const path = require('path');

const serverDistPath = path.join(
  process.cwd(),
  'doc-angular/src/server/server.mjs',
);

export default import(serverDistPath).then((module) => module.app);
