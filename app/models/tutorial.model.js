import sql from "./db.js";

class Tutorial {
  constructor(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  }

  static create(newTutorial, result) {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
      if (err) {
        console.error("Error creating tutorial:", err);
        result(err, null);
        return;
      }
      console.log("Created tutorial:", { id: res.insertId, ...newTutorial });
      result(null, { id: res.insertId, ...newTutorial });
    });
  }

  static findById(id, result) {
    sql.query("SELECT * FROM tutorials WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.error("Error finding tutorial:", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found tutorial:", res[0]);
        result(null, res[0]);
      } else {
        result({ kind: "not_found" }, null);
      }
    });
  }

  static getAll(title, result) {
    let query = "SELECT * FROM tutorials";
    if (title) {
      query += " WHERE title LIKE ?";
    }

    sql.query(query, title ? [`%${title}%`] : [], (err, res) => {
      if (err) {
        console.error("Error fetching tutorials:", err);
        result(null, err);
        return;
      }
      console.log("Tutorials:", res);
      result(null, res);
    });
  }

  static getAllPublished(result) {
    sql.query("SELECT * FROM tutorials WHERE published = true", (err, res) => {
      if (err) {
        console.error("Error fetching published tutorials:", err);
        result(null, err);
        return;
      }
      console.log("Published tutorials:", res);
      result(null, res);
    });
  }

  static updateById(id, tutorial, result) {
    sql.query(
      "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
      [tutorial.title, tutorial.description, tutorial.published, id],
      (err, res) => {
        if (err) {
          console.error("Error updating tutorial:", err);
          result(null, err);
          return;
        }

        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("Updated tutorial:", { id, ...tutorial });
        result(null, { id, ...tutorial });
      }
    );
  }

  static remove(id, result) {
    sql.query("DELETE FROM tutorials WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.error("Error deleting tutorial:", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Deleted tutorial with id:", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    sql.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.error("Error deleting all tutorials:", err);
        result(null, err);
        return;
      }

      console.log(`Deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
  }
}

export default Tutorial;
