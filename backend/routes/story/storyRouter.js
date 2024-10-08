const express = require('express');
const router = express.Router();
const Story = require('../../models/storyModel');
const User = require('../../models/userModel');
const {authMiddleware} = require('../../middlewares/authentication-middleware');


//create story route
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { heading, description, slides, category } = req.body;
        if (!heading || !description || !slides || !category) {
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const newStory = new Story({
            heading,
            description,
            slides,
            category,
            createdBy: req.user._id
        });
        await newStory.save();
        res.status(201).send({ message: 'Story created successfully', story: newStory });
    } catch (err) {
        console.error('Error creating story:', err);
        res.status(500).send({ message: 'Error creating story', error: err.message });
    }
});

// get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).send({ message: 'Stories fetched successfully', stories: stories });
  } catch (err) {
    res.status(500).send({ message: 'Error fetching stories' });
  }
});


// edit story route
router.put('/edit/:id', authMiddleware, async (req, res) => {
    try {
        const { heading, description, slides, category } = req.body;
        const storyId = req.params.id
        

        if (!storyId) {
            return res.status(400).send({ message: 'Story ID is required' });
        }

        const story = await Story.findById(storyId);
        
        if (!story) {
            return res.status(404).send({ message: 'Story not found' });
        }

        
        if (story.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Unauthorized' });
        }

        story.heading = heading || story.heading;
        story.description = description || story.description;
        story.slides = slides || story.slides;
        story.category = category || story.category;

        await story.save();
        res.status(200).send({ message: 'Story updated successfully', story });
    } catch (err) {
        console.error('Error updating story:', err);
        res.status(500).send({ message: 'Error updating story', error: err.message });
    }
});


// Like story route
router.post('/like/:id', authMiddleware, async (req, res) => {
    try {
        const storyId = req.params.id;
        if (!storyId) {
            return res.status(400).send({ message: 'Story ID is required' });
        }
        const userId = req.user._id;

        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).send({ message: 'Story not found' });
        }

        const alreadyLiked = story.likes.includes(userId);

        if(alreadyLiked) {
            story.likes = story.likes.filter(id => id.toString() !== userId.toString());
            await story.save();
            return res.status(200).send({ message: 'Story unliked successfully', story });
        }
        story.likes.push(userId);
        await story.save();

        res.status(200).send({ message: 'Story liked successfully', story });
    } catch (err) {
        console.error('Error liking story:', err);
        res.status(500).send({ message: 'Error liking story', error: err.message });
    }
});









router.get('/download/:id',authMiddleware ,async (req, res) => {
    try {
        const storyId = req.params.id;
        if (!storyId) {
            return res.status(400).send({ message: 'Story ID is required' });
        }
        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).send({ message: 'Story not found' });
        }

        const fileContent = JSON.stringify(story, null, 2);

        res.setHeader('Content-Disposition', `attachment; filename=story-${storyId}.json`);
        res.setHeader('Content-Type', 'application/json');
        res.send(fileContent);
    } catch (err) {
        console.error('Error downloading story:', err);
        res.status(500).send({ message: 'Error downloading story', error: err.message });
    }
});







router.put('/bookmark/:id', authMiddleware, async (req, res) => {
    try {
        const storyId = req.params.id;
        if (!storyId) {
            return res.status(400).send({ message: 'Story ID is required' });
        }
        const userId = req.user._id;


        const story = await Story.findById(storyId);
        
    
        if (!story) {
            return res.status(404).send({ message: 'Story not found' });
        }
        
        // Check kar raha hai ki user already bookmarked this story
        const isAlreadyBookmarked = story.bookmarks.includes(userId);

        if (isAlreadyBookmarked) {
            // agar already bookmarked hai to remove the bookmark
            story.bookmarks = story.bookmarks.filter(id => id.toString() !== userId.toString());
            await story.save();
            return res.status(200).send({ message: 'Bookmark removed successfully', story });
        } else {
            // agar nhi hai to add the bookmark
            story.bookmarks.push(userId);
            await story.save();
            return res.status(200).send({ message: 'Story bookmarked successfully', story });
        }
    } catch (err) {
        console.error('Error processing bookmark:', err);
        res.status(500).send({ message: 'Error processing bookmark', error: err.message });
    }
});


router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).send({ message: 'Category is required' });
        }

        const stories = await Story.find({category});
        res.status(200).send({ stories });
    } catch (err) {
        console.error('Error fetching stories by category:', err);
        res.status(500).send({ message: 'Error fetching stories', error: err.message });
    }
});


// Get all bookmarked stories for the authenticated user
router.get('/bookmarks', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const bookmarkedStories = await Story.find({ bookmarks: userId });
        return res.status(200).send({ message: 'Bookmarked stories fetched successfully', stories: bookmarkedStories });
    } catch (err) {
        return res.status(500).send({ message: 'Error fetching bookmarked stories', error: err.message });
    }
});


module.exports = router