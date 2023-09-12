const Category = require("../models/category");
const Event = require("../models/event");

module.exports = {
    addCategory: async function (req, res) {
        try {
            console.log("Request body:", req.body);
            let aCategory = new Category({name: req.body.name, description: req.body.description, image: req.body.image, eventId: req.body.eventID});
            await aCategory.save();
            res.status(200).json({id: aCategory.catId});
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }
    },
    
    listCategory: async (req, res) => {
        try {
            let categories = await Category.find({}).populate("eventsList");
            res.status(200).json(categories);
        } catch (err) {
            console.error(err);
            res.json({ message: 'Error' });
            }
    },
    
    
    deleteCategory: async (req, res) => {
        const {categoryID} = req.body;
    
        try {
            const deletedCategory = await Category.findOneAndDelete({categoryID});
            if (!deletedCategory) {
                return res.json({ message: 'Category not found' });
            }
      
        const eventsDeleted = await Event.deleteMany({ catId: deletedCategory.eventsList});
    
        if (deletedCategory && eventsDeleted) {
            res.status(200).json({
                "acknowledged": true,
                "deletedCount": 1
            })
        } else {
            res.json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error('Error deleting category:', err);
       } 
    },
 
    updateCategory: async (req, res) => {
        const {name, description, categoryId} = req.body;
    	// let categoryId = req.body.categoryID;
        // let name = req.body.name;
        // let description = req.body.description;

        try{
            // let updatedCategory = await Category.findOneAndUpdate( 
            //     { catId: categoryId },
            //     { name, description},
            //     { new: true }
            //     );
            let updatedCategory = await Category.findOneAndUpdate( { categoryId, name, description });
            if (updatedCategory) {
                res.json({status: 'Category is updated', category: updatedCategory});
    
            } else {
                console.log("Category not found", categoryId);
                res.json({status:'ID not found'});
            }
        } catch(err) {
            console.error('Error updating category:', err);
        }
    }
}




