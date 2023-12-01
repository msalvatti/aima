import app from './app';

const PORT = process.env.PORT || 3000;

(async () => {
  const server = app.listen(PORT, () => {
    console.log(`App is running at port: ${PORT}`);
  });
})();