import bcrypt from "bcryptjs";

const signIn = (db) => async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await db("login").first().where("email", email);
    if (login) {
      const {hash} = login;
      const authenticated = bcrypt.compareSync(password, hash);
      if (authenticated) {
        const user = await db("users").first().where("email", email);
        return res.status(200).json(user);
      }
      return res.status(401).json("Bad credentials!");
    }
    return res.status(404).json(`Error!: User with email ${email} not found`);
  } catch (err) {
    return res.status(500).json(`Error!: ${err}`);
  }
};
export default signIn;
