CREATE OR REPLACE FUNCTION notify_task_created()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('task_created', NEW.id::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_created_trigger
AFTER INSERT ON "Tasks"
FOR EACH ROW
EXECUTE FUNCTION notify_task_created();
