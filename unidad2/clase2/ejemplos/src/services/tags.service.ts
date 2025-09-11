import { Tag } from "../types";
import { tagsRepository } from "../repositories/tags.repository";
import { productsRepository } from "../repositories/products.repository";

export const tagsService = {
  list(): Tag[] {
    return tagsRepository.findAll();
  },
  get(id: string): Tag | null {
    return tagsRepository.findById(id);
  },
  listForProduct(productId: string): Tag[] {
    const ids = productsRepository.listTags(productId);
    return ids
      .map((tid) => tagsRepository.findById(tid))
      .filter((t): t is Tag => Boolean(t));
  },
  link(productId: string, tagId: string) {
    productsRepository.linkTag(productId, tagId);
  },
  unlink(productId: string, tagId: string) {
    productsRepository.unlinkTag(productId, tagId);
  },
};
