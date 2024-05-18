const fs = require("fs");
const path = `./.env`;
const vars = `
REACT_APP_API=${process.env.VITE_APP_API}
`;
fs.writeFileSync(path, vars);
