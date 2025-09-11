import { Request, Response } from "express";
import { tagsService } from "../services/tags.service";

export class TagsController {
  list(_req: Request, res: Response) {
    res.json(tagsService.list());
  }
  get(req: Request<{ id: string }>, res: Response) {
    const tag = tagsService.get(req.params.id);
    if (!tag) return res.sendStatus(404);
    res.json(tag);
  }
  listForProduct(req: Request<{ id: string }>, res: Response) {
    res.json(tagsService.listForProduct(req.params.id));
  }
  link(req: Request<{ id: string }>, res: Response) {
    const { tagId } = req.body || {};
    if (!tagId)
      return res
        .status(400)
        .json({ error: { code: "INVALID_TAG", message: "tagId inválido" } });
    tagsService.link(req.params.id, tagId);
    res.status(201).json({ linked: true });
  }
  unlink(req: Request<{ id: string; tagId: string }>, res: Response) {
    tagsService.unlink(req.params.id, req.params.tagId);
    res.sendStatus(204);
  }
}

export const tagsController = new TagsController();
