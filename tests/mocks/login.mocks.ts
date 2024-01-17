const validPassword = 'terrível';
const hashedPassword = '$2a$10$ruqGO620S6DvlG50fvqPlOahf8dSd7MPuXd0t.ovhoLSoPsEQCgBu';
const validUsername = 'Hera';
const wrongPassword = 'wrongPa33word';
const wrongUsername = 'Wrong';

const loginWithNoUsername = { password: validPassword };

const loginWithNoPassword = { username: validUsername };

const loginWithInvalidUsername = { username: wrongUsername, password: validPassword };

const loginWithInvalidPassword = { username: validUsername, password: wrongPassword };

const correctLogin = { username: validUsername, password: validPassword };

const existingUser = {
  id: 1,
  username: validUsername,
  vocation: 'Goddess',
  level: 100,
  password: hashedPassword,
};

export default {
  loginWithNoUsername,
  loginWithNoPassword,
  loginWithInvalidUsername,
  loginWithInvalidPassword,
  correctLogin,
  existingUser,
  validPassword
};