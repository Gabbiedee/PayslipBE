
import express, { Router } from 'express';
import { registerEmployee } from '../controller/employeeController';
import { getEmployee, getAllEmployees } from '../controller/employeeController';

const employeeRouter = Router();

employeeRouter.post('/register', registerEmployee);
employeeRouter.get('/', getAllEmployees);
employeeRouter.get('/searchEmployee', getEmployee);

export default employeeRouter;