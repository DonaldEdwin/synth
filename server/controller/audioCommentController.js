const Audio = require('../models/audioModel');
const Comment = require('../models/commentModel');

// Upload audio
exports.uploadAudio = async (req, res) => {
  try {
    const { user_id, title, file_path } = req.body;
    const audio = await Audio.create({ user_id, title, file_path });
    res.status(201).json(audio);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

// Get all audios
exports.getAudios = async (req, res) => {
  try {
    const audios = await Audio.findAll();
    res.json(audios);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { audio_id, user_id, content } = req.body;
    const comment = await Comment.create({ audio_id, user_id, content });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

// Get comments for an audio
exports.getComments = async (req, res) => {
  try {
    const { audio_id } = req.params;
    const comments = await Comment.findByAudio(audio_id);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
