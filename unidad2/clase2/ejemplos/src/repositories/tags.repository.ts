import { Tag } from "../types";

const tagsStore: Map<string, Tag> = new Map();

export class TagsRepository {
  findAll(): Tag[] {
    return Array.from(tagsStore.values());
  }
  findById(id: string): Tag | null {
    return tagsStore.get(id) || null;
  }
  save(tag: Tag): void {
    tagsStore.set(tag.id, tag);
  }
}

export const tagsRepository = new TagsRepository();
