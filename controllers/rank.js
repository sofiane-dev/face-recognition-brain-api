const updateRank = (db) => async (req, res) => {
  const { id } = req.body;
  try {
    const user = await db("users").first().where("id", id);
    if (user) {
      const [result] = await db("users")
        .returning("*")
        .where("id", id)
        .update("entries", ++user.entries);
      return res.status(200).json(result);
    }
    return res.status(404).json(`Error!: User with id ${id} not found`);
  } catch (err) {
    return res.status(500).json(`Error!: ${err}`);
  }
};
export default updateRank;
