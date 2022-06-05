import Clinic from '../models/clinic.model';
import { Request, Response } from 'express';

export type ClinicType = {
  name: string;
  email: string;
  location: string;
  waitingTime: Date;
  opensAt: Date;
  closesAt: Date;
  phone: string;
  price: Date;
  clinicAdmin: Date;
  image?: Date;
};

const index = async (): Promise<ClinicType[] | null> => {
  try {
    const clinics = await Clinic.find({});
    return clinics;
  } catch (error) {
    throw new Error(error as string);
  }
};

const show = async (clinicId: string) => {
  try {
    const clinic = await Clinic.findById(clinicId);
    return clinic;
  } catch (error) {
    throw new Error(error as string);
  }
};

const create = (clinic: ClinicType): Promise<ClinicType | void> => {
  const newClinic = new Clinic(clinic);
  try {
    return newClinic.save();
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (
  clinic: ClinicType,
  clinicId: string
): Promise<ClinicType | void> => {
  try {
      await Clinic.findByIdAndUpdate(clinicId, clinic);
      const updatedData:ClinicType =  <ClinicType> await Clinic.findById(clinicId);
    return  updatedData;
  } catch (error) {
    throw new Error(error as string);
  }
};

const destroy = async (clinicId: string): Promise<void> => {
  try {
    await Clinic.findByIdAndRemove(clinicId);
  } catch (error) {
    throw new Error(error as string);
  }
};

const search = () => {};

const clinicAdmin = (clinicId:string) => {
  const clinic = Clinic.findById(clinicId,{_id:0,name:1,location:1}).populate('ClinicAdmin')
  return clinic;
}

const clinicDoctors = (req: Request, res: Response) => {};

const clinicAssistants = (req: Request, res: Response) => {};

const clinicPatients = (req: Request, res: Response) => {};

export default {
  index,
  show,
  create,
  update,
  destroy,
  search,
  clinicDoctors,
  clinicAssistants,
  clinicPatients,
};
