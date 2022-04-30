import app from './app';

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {

  console.log(`Application runing on PORT ${app.get('port')}`);

})