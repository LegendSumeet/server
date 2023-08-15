const Slot = require("../models/slot");
const { Mentor } = require("../models/Mentor");
const User = require("../models/User");
const cnfSlot = require("../models/confirmslot");
const TimeRequest = require("../models/timeRequestSchema");

const createSlots = async (req, res) => {
    try {
        const { mentorID, userID, requestID, slots } = req.body;

        const mentorExists = await Mentor.findById(mentorID);
        const userExists = await User.findById(userID);

        if (!mentorExists || !userExists) {
            return res.status(404).json({ error: 'Mentor or user not found' });
        }

        if (!Array.isArray(slots) || slots.length === 0) {
            return res.status(400).json({ error: 'Invalid slots array' });
        }

        for (const slot of slots) {
            const { date, startTime, endTime } = slot;
            if (!date || !startTime || !endTime) {
                return res.status(400).json({ error: 'All slots must have date, startTime, and endTime' });
            }
        }

        const newSlot = new Slot({
            userID: userID,
            mentorID: mentorID,
            slots: slots,
            requestID: requestID,
            email: mentorExists.email
        });

        await newSlot.save();

        res.status(201).json(newSlot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSlotsByUserAndMentorId = async (req, res) => {
    try {
        const { userID, mentorID, requestID } = req.params;
        const slots = await Slot.find({ mentorID: mentorID, userID: userID, requestID: requestID });

        if (slots.length === 0) {
            return res.status(404).json({ error: 'No slots found for the given parameters' });
        }

        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const SessionDone = async (req, res) => {
    try {
        const { requestID } = req.params;
        await TimeRequest.updateOne(
            { _id: requestID },
            { $set: { status: 'SessionDone' } }
        );
        res.status(200).json("Done:DONE");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const SessionFound = async (req, res) => {
    try {
        const { userID } = req.params;
        
        try {
            const userRequests = await TimeRequest.find({ user_id: userID });
            
            if (userRequests.length === 0) {
                
                return res.status(200).json({ isAllSessionDone: false });
            }
            
            for (const request of userRequests) {
                if (request.status !== 'SessionDone') {
                    return res.status(200).json({ isAllSessionDone: false });
                }
            }
            
           
            return res.status(200).json({ isAllSessionDone: true });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
};


const confirmSlot = async (req, res) => {
    try {
        const { userID, mentorID, slotID, requestID } = req.body;

        const mentorExists = await Mentor.findById(mentorID);
        const userExists = await User.findById(userID);


        const slot = await Slot.findOne({ mentorID: mentorID, userID: userID, requestID: requestID });
        if (!slot) {
            return res.status(404).json({ error: 'Slot not found' });
        }

        const slotToUpdate = slot.slots.find(slot => slot._id.toString() === slotID);
        if (!slotToUpdate) {
            return res.status(404).json({ error: 'Slot not found within user\'s slots' });
        }

        slotToUpdate.isConfirmed = true;



        await slot.save();

        const ConfirmSlot = cnfSlot;
        const confirmedSlot = new ConfirmSlot({
            user: userID,
            mentor: mentorID,
            requestID: requestID,
            slots: [slotToUpdate],
        });

        await confirmedSlot.save();

        await TimeRequest.updateOne(
            { _id: requestID },
            { $set: { confirmslotavail: true } }
        );

        res.status(200).json(confirmedSlot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const confirmedSlottomentor = async (req, res) => {
    try {
        const { requestID } = req.params;
        const confirmedSlot = await cnfSlot.find({ requestID: requestID });
        res.status(200).json(confirmedSlot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const confirmedSlottoUser = async (req, res) => {
    try {
        const { requestIDs } = req.params;
        const confirmedSlot = await cnfSlot.findOne({ requestID: requestIDs });
        if (confirmedSlot != null) {
            res.status(200).json({ "avail": true });
        }
        res.status(200).json({ "avail": false });

    } catch (error) {
        res.status(500).json("error");
    }
}



const areMentorSlotsAvailableForUser = async (req, res) => {
    try {
        const { userID, mentorID, requestID } = req.params;

        const mentorExists = await Mentor.findById(mentorID);
        const userExists = await User.findById(userID);
        const requestExits = await TimeRequest.findById(requestID);


        if (!mentorExists || !userExists || !requestExits) {
            return res.status(404).json({ error: 'Mentor or user not found' });
        }


        const slots = await Slot.find({ mentorID: mentorID, userID: userID, requestID: requestID });

        if (slots.length === 0) {
            return res.status(200).json({ slotsAvailable: "false" });
        }


        res.status(200).json({ slotsAvailable: "true" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createSlots,
    getSlotsByUserAndMentorId,
    confirmSlot,
    areMentorSlotsAvailableForUser,
    confirmedSlottomentor,
    confirmedSlottoUser,
    SessionDone,
    SessionFound

}