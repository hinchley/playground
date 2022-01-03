export const prompt = (req, res) => {
  res.render('auth/index', {
    title: "Login",
    username: "",
    password: ""
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  const secret = process.env.ADMIN_PASSWORD || 'password';

  if (username == 'admin' && password == secret) {
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