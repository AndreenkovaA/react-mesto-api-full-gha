const params = require('params');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const DuplicateError = require('../errors/duplicate-err');

const userParams = ['name', 'about'];
const avatarParams = ['avatar'];

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь по указанному _id не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new BadRequestError('Пользователь по указанному _id не найден.');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name, about, avatar, email, id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new BadRequestError('Переданы некорректные данные при создании пользователя.');
        next(e);
      } else if (err.code === 11000) {
        const e = new DuplicateError('Пользователь с такой почтой уже существует.');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    params(req.body).only(userParams),
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    params(req.body).only(avatarParams),
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
