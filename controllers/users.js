const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    if (!email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязятельные поля' })
=======
const login = async(req, res) => {
    const (email, password) = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'})
>>>>>>> 3526bb62b1fc5a70e6cf87ac0b5a4c89289bfb9d
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });
<<<<<<< HEAD
  
    const isPasswordCorrect = user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;
  
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' })
=======

    const isPasswordCorrect = user && {await brypt.compare(password, user.password)};
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect){
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'})
        })
    } else{
        return res.status(400).json({message: 'Неверно введён логин или пароль'})
    }
}

const register = async(req, res, next) => {
    const {email, password, name} = req.body;

    if (!email || !password || !name){
        return res.send(400).json({message: 'Пожалуйста, заполните обязательные поля'})
    }

    const registeredUser = await prisma.user.findFirst({
        where: {
            email
        }

    });

    
    if (registeredUser){
        return res.status(400).json({message: 'Пользователь с таким email уже существует'})
    }

    const salt = await brypt.genSalt(10);
    const hashedPassword = await brypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
        res.status(201).json({
            id: user.id,
            email: user.email,
            name,
            token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'})
        })
    } else {
        return res.status(400).json({message: "Не удалось создать пользователя"})
>>>>>>> 3526bb62b1fc5a70e6cf87ac0b5a4c89289bfb9d
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

<<<<<<< HEAD
/**
 * 
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if(!email || !password || !name) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
    }
  
    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });
  
    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь, с таким email уже существует' })
    }
  
    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);
  
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassord
      }
    });
  
    const secret = process.env.JWT_SECRET;
  
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

/**
 * 
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user)
=======
const current = async(req, res) => {
    return res.status(200).json(req.user);
>>>>>>> 3526bb62b1fc5a70e6cf87ac0b5a4c89289bfb9d
}

module.exports = {
  login,
  register,
  current
}