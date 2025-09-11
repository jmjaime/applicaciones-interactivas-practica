import { Request, Response } from "express";
import { categoriesService } from "../services/categories.service";

export class CategoriesController {
  list(_req: Request, res: Response) {
    res.json(categoriesService.list());
  }
  get(req: Request<{ id: string }>, res: Response) {
    const cat = categoriesService.get(req.params.id);
    if (!cat) return res.sendStatus(404);
    res.json(cat);
  }
  products(
    req: Request<{ id: string }, {}, {}, { page?: string; limit?: string }>,
    res: Response
  ) {
    const result = categoriesService.products(
      req.params.id,
      req.query.page,
      req.query.limit
    );
    res.json(result);
  }
}

export const categoriesController = new CategoriesController();
