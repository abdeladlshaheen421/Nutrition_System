import express, { Request, Response, NextFunction } from 'express';
import clinicController, { ClinicType } from '../controllers/clinic.controller';
import {
  validateCreation,
  isValidIdParam,
  isValidClinic,
  validateUpdate,
} from '../middlewares/clinic.middleware';
import { validate } from './client.router';
import { matchedData } from 'express-validator';
import {upload} from '../utilities/Image.utils'

// get all clinics
const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clinics: ClinicType[] = <ClinicType[]>await clinicController.index();
    res.status(200).json(clinics);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const matched = matchedData(req, {
      includeOptionals: true,
    });
    const newClinic: ClinicType = <ClinicType>(
      await clinicController.create(<ClinicType>matched)
    );
    res.status(201).json(newClinic);
  } catch (error) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const clinic: ClinicType = <ClinicType>(
      await clinicController.show(req.params.id)
    );
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    await clinicController.destroy(req.params.id);
    res.status(200).json({ message: 'Clinic is deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    validate(req);
    const matched = matchedData(req, {
      includeOptionals: true,
    });
    const updatedData = await clinicController.update(
      <ClinicType>matched,
      req.params.id
    );
    res.send(updatedData);
  } catch (error) {
    next(error);
  }
};

const clinicRouter = (app: express.Application): void => {
  app
    .route('/clinics')
    .get(index) // get all clinics in our system
    .post(validateCreation,upload.single('image') ,create); // This will create a clinic for Admin

  app
    .route('/clinic/:id')
    .all(isValidIdParam)
    .get(show)
    .delete(destroy)
    .put(validateUpdate, update);

  app.get('/clinics/search', clinicController.search); // using query param
};

export default clinicRouter;
