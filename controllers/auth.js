import config from '../config.js';

export const prompt = (req, res) => {
  res.render('auth/index', {
    title: "Login",
    username: "",
    password: ""
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (username == 'admin' && password == config.admin.password) {
    req.session.isAuth = true;
    res.redirect('/admin');
  } else {
    const error = 'Invalid credentials';
    res.render('auth/index', { title: "Login", username, password, error });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
};