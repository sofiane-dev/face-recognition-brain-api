import bcrypt from "bcryptjs";

const register = (db) => async (req, res) => {
  const trx = await db.transaction();
  try {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const [user] = await trx("users")
      .insert({ name, email, joined: new Date() })
      .returning("*");
    await trx("login").insert({ email, hash });
    await trx.commit();
    return res.json(user);
  } catch (err) {
    await trx.rollback();
    return res.status(500).json(`ERROR!: ${err.detail}`);
  }
};

export default register;
