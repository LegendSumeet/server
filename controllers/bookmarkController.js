const Bookmark = require('../models/Bookmark');

module.exports = {
    createBookmark: async (req, res) => {

        const MentorId = req.body.MentorId;
        try {
            const Mentor = await Mentor.findById(MentorId);
            if (!Mentor) {
                return res.status(404).json("Mentor not found");
            }
            const newBookmark = new Bookmark({
                mentor: MentorId, userId: req.user.id
            });
            await newBookmark.save();
            const { password, ...others } = newBookmark._doc;
            res.status(201).json(others);
        } catch (err) {
            res.status(500).json(err);
        }

    },
    deleteBookmark: async (req, res) => {
        try {
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).json("Bookmark deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ UserId: req.params.userId });
            res.status(200).json(bookmarks);
        } catch (err) {
            res.status(500).json(err);
        }
    }


}