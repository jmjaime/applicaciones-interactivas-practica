import { Request, Response } from "express";
import { coursesService } from "../services/courses.service";

// Controllers only wire, return 501-compatible shapes for now
export class CoursesController {
  list(_req: Request, res: Response) {
    const items = coursesService.list();
    res
      .status(501)
      .json({ items, page: 1, limit: items.length, total: items.length });
  }
  get(req: Request, res: Response) {
    const course = coursesService.get(req.params.id);
    if (!course) return res.status(501).json({ id: req.params.id });
    res.status(501).json(course);
  }
  create(req: Request, res: Response) {
    const created = coursesService.create(req.body || {});
    res.status(501).location(`/api/courses/${created.id}`).json(created);
  }
  replace(req: Request, res: Response) {
    const replaced = coursesService.replace(req.params.id, req.body || {});
    res.status(501).json(replaced);
  }
  update(req: Request, res: Response) {
    const updated = coursesService.update(req.params.id, req.body || {});
    res.status(501).json(updated ?? { id: req.params.id });
  }
  remove(req: Request, res: Response) {
    const ok = coursesService.delete(req.params.id);
    res.status(501).json({ deleted: ok, id: req.params.id });
  }
}

export const coursesController = new CoursesController();
