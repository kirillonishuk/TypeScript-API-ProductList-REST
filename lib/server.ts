import app from './app';
import bootstrap from './controllers/bootstrap';

process.argv.forEach((param) => {
    switch (param) {
      case '--bootstrap':
        bootstrap();
        break;
    };
  });

const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log(`Server start at port ${PORT}.`);
});