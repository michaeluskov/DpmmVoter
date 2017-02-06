exports.notFound = function(req, res, next) {
  res.status(404);
  res.render('index', {
      user: req.user,
      caption: "Ты куда-то не туда зашел",
      description: "Вернись на <a href='/'>главную</a>"
  });
};

exports.logError = function (error, req, res, next) {
    console.error(error);
    console.error(error.stack);
    next(error);
};

exports.serverError = function(error, req, res, next) {
  res.status(500);
    res.render('index', {
        user: req.user,
        caption: "Какая-то ошибка",
        description: "Мы уже ее чиним. Но это не точно. Вернись на <a href='/'>главную</a>"
    });
};
