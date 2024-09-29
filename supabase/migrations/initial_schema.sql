CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  branch_id INTEGER,
  parent_message_id INTEGER,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  root_message_id INTEGER REFERENCES messages(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE messages ADD CONSTRAINT fk_branch FOREIGN KEY (branch_id) REFERENCES branches(id);
ALTER TABLE messages ADD CONSTRAINT fk_parent_message FOREIGN KEY (parent_message_id) REFERENCES messages(id);