const { User, Thought } = require("../models");
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  newThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thoughts: _id } },
          { runValidators: true, new: true }
        );
      })
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({ message: "Thought created but no user" })
          : res.json(updatedUser)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
