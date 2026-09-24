import { pool } from "./db";

const initDb = async () => {
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL, 
      password_hash text NOT NULL, 
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT user_email_unique 
        UNIQUE (email)
    );

    CREATE TABLE IF NOT EXISTS projects (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      slug text NOT NULL, 
      short_description text NOT NULL,
      description text NOT NULL, 
      problem text, 
      solution text,

      thumbnail_url text, 
      thumbnail_public_id text,
      github_url text, 
      live_url text, 
      
      featured boolean NOT NULL DEFAULT false, 
      status text NOT NULL,
      start_date date,
      end_date date, 

      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT project_title_unique
        UNIQUE (title),

      CONSTRAINT project_slug_unique 
        UNIQUE (slug),

      CONSTRAINT project_status_valid
        CHECK (status IN (
          'in_progress',
          'completed',
          'maintained',
          'archived',
          'planned'
        ))
    );

    CREATE TABLE IF NOT EXISTS skills (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL, 
      category text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT skill_name_unique 
        UNIQUE (name),

      CONSTRAINT skill_category_valid
        CHECK (category IN (
          'frontend',
          'backend',
          'database',
          'devops',
          'cloud',
          'language',
          'testing',
          'tools',
          'other'
        ))
    );

    CREATE TABLE IF NOT EXISTS project_skills (
      project_id uuid NOT NULL REFERENCES public.projects(id) 
        ON DELETE CASCADE,
      skill_id uuid NOT NULL REFERENCES public.skills(id) 
        ON DELETE CASCADE,

      PRIMARY KEY (project_id, skill_id)
    );

    CREATE TABLE IF NOT EXISTS experience (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      company text NOT NULL, 
      position text NOT NULL, 
      description text NOT NULL, 
      start_date date NOT NULL, 
      end_date date, 
      current boolean NOT NULL DEFAULT false, 
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT experience_company_position_start_date_unique
        UNIQUE (company, position, start_date)
    );

    CREATE TABLE IF NOT EXISTS education (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      institution text NOT NULL, 
      degree text NOT NULL, 
      field text,
      description text, 
      start_date date,
      end_date date
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL, 
      email text NOT NULL, 
      subject text, 
      message text NOT NULL, 
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz, 
      read_at timestamptz
    );
    `,
  );
};

initDb();
