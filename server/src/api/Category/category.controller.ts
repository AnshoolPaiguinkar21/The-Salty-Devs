import type { Request, Response } from 'express';
import * as CategoryServices from './category.services.ts';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryServices.getCategories();
    return res.status(200).json(categories);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const uniqueCategory = await CategoryServices.getCategory(id);
    return res.status(200).json(uniqueCategory);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await CategoryServices.addCategory(req.body);
    return res.status(201).json(newCategory);
  } catch (error: any) {
    return res.json(error.message);
  }
};

export const editCategory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const updatedCategory = await CategoryServices.editCategory(id, req.body);
    return res.status(200).json(updatedCategory);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    await CategoryServices.deleteCategory(id);
    return res.json({ message: 'Category deleted' });
  } catch (error: any) {
    return res.json(error.message);
  }
};
