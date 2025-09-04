import type { Request, Response } from 'express';
import * as CategoryServices from './category.services.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryServices.getCategories();
    return res.status(HttpStatusCodes.OK).json(categories);
  } catch (error: any) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const uniqueCategory = await CategoryServices.getCategory(id);
    return res.status(HttpStatusCodes.OK).json(uniqueCategory);
  } catch (error: any) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await CategoryServices.addCategory(req.body);
    return res.status(HttpStatusCodes.CREATED).json(newCategory);
  } catch (error: any) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const editCategory = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const updatedCategory = await CategoryServices.editCategory(id, req.body);
    return res.status(HttpStatusCodes.OK).json(updatedCategory);
  } catch (error: any) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    await CategoryServices.deleteCategory(id);
    return res.json({ message: 'Category deleted' });
  } catch (error: any) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
