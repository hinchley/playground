export const isAuth = (req, res, next) => {
  req.session.isAuth ? res.redirect('/admin') : next();
};

export const isNotAuth = (req, res, next) => {
  req.session.isAuth ? next() : res.redirect('/login');
};