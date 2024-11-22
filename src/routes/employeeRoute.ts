
import express, { Router } from 'express';
import { registerEmployee } from '../controller/employeeController';
import { getEmployees, getAllEmployees } from '../controller/employeeController';

const employeeRouter = Router();

employeeRouter.post('/register', registerEmployee);
employeeRouter.get('/', getEmployees);
employeeRouter.get('/searchEmployee', getAllEmployees);

export default employeeRouter;