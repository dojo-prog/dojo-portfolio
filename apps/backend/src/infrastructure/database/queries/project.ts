export const PROJECT_WITH_RELATIONS_PROJECTION = `
  p.*,

  COALESCE(
    (
      SELECT json_agg(
        json_build_object(
          'id', s.id, 
          'name', s.name, 
          'category', s.category
        )
      ) 
      FROM skills s
      JOIN project_skills ps
        ON ps.skill_id = s.id
      WHERE ps.project_id = p.id 
    ),
    '[]'::json
  ) AS project_skills
`;
