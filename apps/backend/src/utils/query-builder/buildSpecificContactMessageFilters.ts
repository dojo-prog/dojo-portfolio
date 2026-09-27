import { ContactMessageQuery } from "@dojo-portfolio/shared";

interface Result {
  whereClause: string;
  orderByClause: string;
  limitClause: string;
  offsetClause: string;
  values: unknown[];
}

interface Params {
  query: ContactMessageQuery;
  baseConditions?: string[];
  baseValues?: string[];
  searchableColumns?: string[];
}

export const buildSpecificContactMessageFilter = ({
  query,
  baseConditions = [],
  baseValues = [],
  searchableColumns,
}: Params): Result => {
  const conditions: string[] = baseConditions;
  const values: unknown[] = baseValues;

  const clauses = {
    whereClause: "",
    orderByClause: "ORDER BY created_at IS NULL, created_at DESC",
    limitClause: "",
    offsetClause: "",
  };

  const { page, limit, sort, unread, ...rest } = query;

  // =======================================
  // WHERE CLAUSE CONSTRUCTION
  // =======================================

  for (const [key, value] of Object.entries(rest)) {
    if (value === undefined) continue;

    const placeholder = `$${values.length + 1}`;

    if (key === "search" && searchableColumns?.length) {
      const searchConditions = searchableColumns
        .map((sc) => `${sc} ILIKE ${placeholder}`)
        .join(" OR ");

      conditions.push(`(${searchConditions})`);
      values.push(`%${value}%`);
    } else {
      conditions.push(`${key} = ${placeholder}`);
      values.push(value);
    }
  }

  // Unread
  if (unread) {
    conditions.push("read_at IS NULL");
  }

  if (conditions.length > 0) {
    clauses.whereClause = `WHERE ${conditions.join(" AND ")}`;
  }

  // =======================================
  // ORDER BY CLAUSE CONSTRUCTION
  // =======================================

  const sortMap: Record<string, string> = {
    newest: "created_at DESC",
    oldest: "created_at ASC",
  };

  if (sort && sortMap[sort]) {
    clauses.orderByClause = `ORDER BY ${sortMap[sort]}`;
  }

  // =======================================
  // LIMIT & OFFSET CLAUSE
  // =======================================

  if (page && limit && !Number.isNaN(page) && !Number.isNaN(limit)) {
    clauses.limitClause = `LIMIT ${limit}`;
    clauses.offsetClause = `OFFSET ${(page - 1) * limit}`;
  }

  return {
    ...clauses,
    values,
  };
};
