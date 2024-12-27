import axios from "axios";

import type {
  Document,
  Category,
  InspiringPerson,
  Executor,
} from "@prisma/client";

type DocumentWithRelations = Document & {
  category: Category;
  inspiringPerson: InspiringPerson;
  executor: Executor;
};

interface DocumentsResponse {
  documents: DocumentWithRelations[];
  categories: Category[];
  inspiringPersons: InspiringPerson[];
  executors: Executor[];
}

export const getDocuments = async () => {
  return (await axios.get<DocumentsResponse>("/api/documents")).data;
};
