const { Schema, model } = require("mongoose");
const reactionSchema = new Schema(
    {
reactionId:{
    // needs to complete schema
}
    }
    ,
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //min len and max  len
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method
    },
    username: {
      type: String,
      required: true,
    },reactions:
    [reactionSchema]

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


const Thought = model("thought", thoughtSchema);

module.exports = Thought;
