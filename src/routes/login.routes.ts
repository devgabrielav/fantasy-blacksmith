import { Router } from 'express';
import loginController from '../controllers/login.controller';

const loginRoutes = Router();

loginRoutes.post('/', loginController.login);

export default loginRoutes;