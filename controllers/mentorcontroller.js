const Mentor = require("../models/Mentor");

module.exports = {
    creatementor: async (req, res) => {
        const newMentor = new Mentor(req.body);
        try {
            const savedMentor = await newMentor.save();
            const { __V, ccreatedAt, updatedAt, ...newmentorinfo } = savedMentor._doc;
            res.status(201).json(newmentorinfo);
        } catch (err) {
            res.status(500).json(err);
        }

    },
    updatementor: async (req, res) => {
        try {
            const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });

            const { __V, ccreatedAt, updatedAt, ...newmentorinfo } = updatedMentor._doc;
            res.status(200).json(newmentorinfo);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    deletementor: async (req, res) => {
        try {
            await Mentor.findByIdAndDelete(req.params.id);
            res.status(200).json("Mentor deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getmentor: async (req, res) => {
        try {
            const mentor = await Mentor.findById(req.params.id);
            const { __V, ccreatedAt, updatedAt, ...newmentorinfo } = mentor._doc;
            res.status(200).json(newmentorinfo);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllmentor: async (req, res) => {
        const queryNew = req.query.new;
        const queryCategory = req.query.category;
        try {
            let mentors;
            if (queryNew) {
                mentors = await Mentor.find().sort({ createdAt: -1 }).limit(5);
            } else if (queryCategory) {
                mentors = await Mentor.find({
                    categories: {
                        $in: [queryCategory],
                    },
                });
            } else {
                mentors = await Mentor.find();
            }
            res.status(200).json(mentors);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    searchmentor: async (req, res) => {
        try {
            const mentorresults = await Mentor.aggregate([
                [
                    {
                        $search: {
                            index: "mentorsearch",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            ])


            res.status(200).json(mentorresults);
        } catch (err) {
            res.status(500).json(err);
        }
    }





}