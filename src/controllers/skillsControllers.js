const db = require("../db");

exports.addSkill = async (req, res) => {
  try {
    const { user_id, skill_name } = req.body;
    const [rows, fields] = await db.query(
      `INSERT INTO SKILLS (USER_ID, SKILL_NAME) VALUES (?, ?)`,
      [user_id, skill_name]
    );
    res.status(200).json({ rows: rows[0] });
  } catch (err) {
    console.log("Failed to add skill:", err);
    res.status(500).json({ error: "error adding skill" });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, fields] = await db.query(
      `DELETE FROM SKILLS WHERE SKILL_ID = ?`,
      [id]
    );
    res.status(200).json({ rows });
  } catch (err) {
    console.log("Failed to delete skill:", err);
    res.status(500).json({ error: "error deleting skill" });
  }
};

exports.getSkillsByUserId = async (req, res ) => {
    const { id } = req.params;
  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM skills WHERE user_id = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "No skills found for user" });
    } else {
      res.json(rows);
    }
  } catch (err) {
    console.error("Error getting skills:", err);
    res.status(500).json({ error: "Error getting skills" });
  }
}
