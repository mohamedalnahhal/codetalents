CREATE OR REPLACE FUNCTION trg_attempt_update()
RETURNS TRIGGER AS $$
BEGIN
    -- If user has NOT attempted before → increment attemptCount
    IF NOT EXISTS (
        SELECT 1 FROM user_submission
        WHERE problem_id = NEW.problem_id
        AND username = NEW.username
        AND (problem_id, username) <> (NEW.problem_id, NEW.username)
    ) THEN
        UPDATE problem
        SET attempt_count = attempt_count + 1
        WHERE id = NEW.problem_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_solved_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Accepted' THEN
        -- Check if user already solved it
        IF NOT EXISTS (
            SELECT 1 FROM user_submission
            WHERE problem_id = NEW.problem_id
            AND username = NEW.username
            AND status = 'Accepted'
            AND (problem_id, username) <> (NEW.problem_id, NEW.username)
        ) THEN
            UPDATE problem
            SET solved_count = solved_count + 1
            WHERE id = NEW.problem_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_attempt
AFTER INSERT ON user_submission
FOR EACH ROW EXECUTE FUNCTION trg_attempt_update();

CREATE TRIGGER trig_solved
AFTER INSERT ON user_submission
FOR EACH ROW EXECUTE FUNCTION trg_solved_update();

CREATE OR REPLACE FUNCTION update_post_like_counter()
RETURNS TRIGGER AS $$
BEGIN
    IF(IG_OP = 'INSERT') THEN
        UPDATE post
        SET like_counter = like_counter + 1
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF(TG_OP = 'DELETE') THEN
        UPDATE post
        SET like_counter = like_counter - 1
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS trig_increment_post_like_counter
AFTER INSERT ON user_liked_post
FOR EACH ROW EXECUTE FUNCTION update_post_like_counter();

CREATE TRIGGER IF NOT EXISTS trig_decrement_post_like_counter
AFTER DELETE ON user_liked_post
FOR EACH ROW EXECUTE FUNCTION update_post_like_counter();

CREATE OR REPLACE FUNCTION update_comment_like_counter()
RETURNS TRIGGER AS $$
BEGIN
    IF(IG_OP = 'INSERT') THEN
        UPDATE comments
        SET like_counter = like_counter + 1
        WHERE id = NEW.comment_id;
        RETURN NEW;
    ELSIF(TG_OP = 'DELETE') THEN
        UPDATE comments
        SET like_counter = like_counter - 1
        WHERE id = OLD.comment_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS trig_increment_comment_like_counter
AFTER INSERT ON user_liked_comments
FOR EACH ROW EXECUTE FUNCTION update_comment_like_counter();

CREATE TRIGGER IF NOT EXISTS trig_decrement_comment_like_counter
AFTER DELETE ON user_liked_comments
FOR EACH ROW EXECUTE FUNCTION update_comment_like_counter();