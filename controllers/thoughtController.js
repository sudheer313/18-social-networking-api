const { User, Thought } = require("../models");
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single thought
  getThoughtbyId(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select("-__v")

      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
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

  // Update a Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      runValidators: true,
      new: true,
    })
      .then((updatedThought) =>
        !updatedThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(updatedThought)
      )
      .catch((err) => {
        console.log(err);

        res.status(500).json(err);
      });
  },
  //delete a thought

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }

        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((UserData) => {
        if (!UserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }
        res.json({ message: "Thought successfully deleted!" });
      })
      .catch((err) => res.json(err));
  },

  //add reactions

  addReactions({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((updatedThought) => {
        if (!updatedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(updatedThought);
      })
      .catch((err) => res.json(err));
  },

  //delete reactions
  deleteReactions({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true }
    )
      .then((deletedReaction) => res.json(deletedReaction))
      .catch((err) => res.json(err));
  },
};
