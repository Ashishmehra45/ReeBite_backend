
const storageServices = require("../services/storage.services");
const foodModel = require("../models/food.model"); // Food Schema
const likeModel = require("../models/like.model"); // Like Schema
const saveModel = require("../models/save.model"); // Save Schema
const { v4: uuid } = require("uuid"); // For generating unique IDs

// --- 1. Create New Food Item (POST /api/food/create) ---
async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const fileUploadResult = await storageServices.UploadFile(
            req.file.buffer,
            uuid()
        );
        const fooditem = await foodModel.create({
            name: req.body.name,
            Video: fileUploadResult.url,
            description: req.body.description,
            foodpartner: req.foodpartner._id,
            // likecount will default to 0
        });

        res.status(201).json({
            message: "Food item created",
            fooditem: fooditem,
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message || err,
        });
    }
}

// --- 2. Get All Food Items (GET /api/food) ---
async function getFoodItem(req, res) {
    // NOTE: Production use case mein, aapko yeh bhi check karna chahiye ki user ne kaunse items like ya save kiye hain.
    const fooditem = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched successfully",
        fooditem,
    });
}

// --- 3. Like/Unlike Food Item (POST /api/food/like) ---
async function likefood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    try {
        const alreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId,
        });

        if (alreadyLiked) {
            // --- UNLIKE LOGIC ---
            await likeModel.deleteOne({ user: user._id, food: foodId });
            
            const updatedFood = await foodModel.findByIdAndUpdate(
                foodId,
                { $inc: { likecount: -1 } },
                { new: true }
            );
            
            return res.status(200).json({
                message: "Unlike successfully",
                likecount: updatedFood.likecount,
                isLiked: false, // Frontend flag
            });
        }

        // --- LIKE LOGIC ---
        await likeModel.create({ user: user._id, food: foodId });
        
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likecount: 1 } },
            { new: true }
        );
        
        res.status(201).json({
            message: "Like successfully",
            likecount: updatedFood.likecount,
            isLiked: true, // Frontend flag
        });

    } catch (err) {
        console.error("Like operation failed:", err);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message || err,
        });
    }
}

// --- 4. Save/Unsave Food Item (POST /api/food/save) ---
async function savefood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    try {
        const alreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId,
        });

        if (alreadySaved) {
            // --- UNSAVE LOGIC ---
            await saveModel.deleteOne({ user: user._id, food: foodId });
            
            return res.status(200).json({
                message: "Unsaved successfully",
                isSaved: false, // Frontend flag
            });
        }

        // --- SAVE LOGIC ---
        await saveModel.create({ user: user._id, food: foodId });
        
        res.status(201).json({
            message: "Saved successfully",
            isSaved: true, // Frontend flag
        });

    } catch (err) {
        console.error("Save operation failed:", err);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message || err,
        });
    }
}

// --- 5. Get Saved Videos (GET /api/food/save) ---
async function savefoodvideo(req, res) {
    const user = req.user;

    try {
        // Fetch all saved entries and populate the 'food' details
        const savefood = await saveModel.find({ user: user._id }).populate('food');

        // Filter out corrupted entries where the original food item might have been deleted (item.food === null)
        const validSavedFood = savefood.filter(item => item.food !== null);

        if (!validSavedFood || validSavedFood.length === 0) {
            // Return 200 OK with an empty array if no valid videos are found
            return res.status(200).json({
                message: 'No saved video found',
                savefood: [],
            });
        }
        console.log(savefood)
        console.log("validFood "+validSavedFood)
        
        res.status(200).json({
            message: 'Saved videos fetched successfully',
            savefood: validSavedFood, // Frontend receives this filtered array
        });

    } catch (err) {
        console.error("Error fetching saved videos:", err);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message || err,
        });
    }
}
// const commentModel = require("../models/comments.model");


// // --- 1. Add Comment (POST /api/comment/add) ---
// async function addComment(req, res) {
//     try {
//         const { foodId, text } = req.body;
//         const user = req.user;

//         if (!foodId || !text) {
//             return res.status(400).json({ error: "Food ID and text are required" });
//         }

//         // --- 1️⃣ Comment create ---
//         const comment = await commentModel.create({
//             user: user._id,
//             food: foodId,
//             text
//         });

//         // --- 2️⃣ Food me push karo ---
//         await foodModel.findByIdAndUpdate(foodId, { $push: { comments: comment._id } });

//         res.status(201).json({
//             message: "Comment added successfully",
//             comment
//         });
//     } catch (err) {
//         console.error("Error adding comment:", err);
//         res.status(500).json({
//             error: "Internal Server Error",
//             details: err.message || err
//         });
//     }
// }

// // --- 2. Get Comments (GET /api/comment/:foodId) ---
// async function getComments(req, res) {
//     try {
//         const { foodId } = req.params;

//         const food = await foodModel.findById(foodId)
//             .populate({
//                 path: "comments",
//                 populate: { path: "user", select: "name email" }
//             });

//         if (!food) {
//             return res.status(404).json({ error: "Food item not found" });
//         }

//         res.status(200).json({
//             message: "Comments fetched successfully",
//             comments: food.comments
//         });
//     } catch (err) {
//         console.error("Error fetching comments:", err);
//         res.status(500).json({
//             error: "Internal Server Error",
//             details: err.message || err
//         });
//     }
// }

// // --- 3. Delete Comment (DELETE /api/comment/:id) ---
// async function deleteComment(req, res) {
//     try {
//         const { id } = req.params;
//         const user = req.user;

//         const comment = await commentModel.findById(id);
//         if (!comment) {
//             return res.status(404).json({ error: "Comment not found" });
//         }

//         // Sirf comment owner hi delete kar sake
//         if (comment.user.toString() !== user._id.toString()) {
//             return res.status(403).json({ error: "Not authorized to delete this comment" });
//         }

//         // Food se bhi remove kar do
//         await foodModel.findByIdAndUpdate(comment.food, { $pull: { comments: comment._id } });

//         await commentModel.findByIdAndDelete(id);

//         res.status(200).json({ message: "Comment deleted successfully" });
//     } catch (err) {
//         console.error("Error deleting comment:", err);
//         res.status(500).json({
//             error: "Internal Server Error",
//             details: err.message || err
//         });
//     }
// }


module.exports = { 
    createFood, 
    getFoodItem, 
    likefood, 
    savefood, 
    savefoodvideo ,
    // addComment,
    // getComments,
    // deleteComment
};