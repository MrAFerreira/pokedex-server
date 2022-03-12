const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const teamSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    pokemon: {
      type: [String],
      validate: [arrayLimit, 'Team exceeds the limit of 6'],
    },
  },
  {
    timestamps: true,
  }
);

const Team = model('Team', teamSchema);

function arrayLimit(val) {
  return val.length <= 6;
}

module.exports = Team;
