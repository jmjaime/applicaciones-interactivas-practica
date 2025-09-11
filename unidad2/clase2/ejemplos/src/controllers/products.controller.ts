import { Request, Response } from "express";
import { productsService, ProductsQuery } from "../services/products.service";

// Seed on first import
productsService.seed();

export class ProductsController {
  list(req: Request<{}, {}, {}, ProductsQuery>, res: Response) {
    const result = productsService.list(req.query);
    res.json(result);
  }

  create(req: Request, res: Response) {
    const { name, price, currency, categoryId } = req.body || {};
    if (!name || price == null || !currency)
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "name, price, currency requeridos",
        },
      });
    const prod = productsService.create({
      name,
      price: Number(price),
      currency,
      categoryId,
    });
    res.status(201).location(`/api/products/${prod.id}`).json(prod);
  }

  get(req: Request<{ id: string }>, res: Response) {
    const item = productsService.get(req.params.id);
    if (!item) return res.sendStatus(404);
    res.json(item);
  }

  patch(req: Request<{ id: string }>, res: Response) {
    const item = productsService.updatePartial(req.params.id, req.body ?? {});
    if (!item) return res.sendStatus(404);
    res.json(item);
  }

  put(req: Request<{ id: string }>, res: Response) {
    const { name, price, currency, categoryId } = req.body || {};
    if (!name || price == null || !currency)
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "name, price, currency requeridos",
        },
      });
    const { prod, existed } = productsService.replace(req.params.id, {
      name,
      price: Number(price),
      currency,
      categoryId,
    });
    return res.status(existed ? 200 : 201).json(prod);
  }

  remove(req: Request<{ id: string }>, res: Response) {
    const ok = productsService.remove(req.params.id);
    return res.sendStatus(ok ? 204 : 404);
  }

  listByCategory(
    req: Request<{ categoryId: string }, {}, {}, ProductsQuery>,
    res: Response
  ) {
    const result = productsService.listByCategory(
      req.params.categoryId,
      req.query.page,
      req.query.limit
    );
    res.json(result);
  }

  getCategoryOfProduct(req: Request<{ id: string }>, res: Response) {
    const cat = productsService.getCategoryOfProduct(req.params.id);
    if (!cat) return res.sendStatus(404);
    res.json(cat);
  }

  listTags(req: Request<{ id: string }>, res: Response) {
    const list = productsService.listTags(req.params.id);
    res.json(list);
  }

  linkTag(req: Request<{ id: string }>, res: Response) {
    const { tagId } = req.body || {};
    if (!tagId)
      return res
        .status(400)
        .json({ error: { code: "INVALID_TAG", message: "tagId inválido" } });
    productsService.linkTag(req.params.id, tagId);
    res.status(201).json({ linked: true });
  }

  unlinkTag(req: Request<{ id: string; tagId: string }>, res: Response) {
    productsService.unlinkTag(req.params.id, req.params.tagId);
    res.sendStatus(204);
  }
}

export const productsController = new ProductsController();
