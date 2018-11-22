import app from './app';
import { wakeUp } from './autowakeup';
import { drop, bootStrap, erase } from './controllers/bootstrap';

process.argv.forEach((param) => {
  switch (param) {
    case '--bootstrap':
      bootStrap('products');
      break;
    case '--drop':
      drop();
      break;
    case '--erase':
      erase('products');
      break;
  };
});

const PORT = parseInt(process.env.PORT) || 8080;


app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}.`);
});

setInterval(() => wakeUp(), 3600000);