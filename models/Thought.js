const { Schema, model, Types } = require("mongoose");
const moment = require("moment");
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      // Default is set to new ObjectID
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
   
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method
      get: (timestamp) => moment(timestamp).utc().format("YYYY-MM-DD"),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //min len and max  len
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method
      get: (timestamp) => moment(timestamp).utc().format("YYYY-MM-DD"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
