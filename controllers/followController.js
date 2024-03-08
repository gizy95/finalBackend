import User from '../models/user.js';

async function addFollower(userId, followerId) {
    req.session.userId = userId;
    req.params.id = followerId;
    try {
      await User.updateOne({ _id: userId }, { $push: { followers: followerId } });
      console.log(`User ${userId} is now followed by ${followerId}`);
    } catch (error) {
      console.error('Error adding follower:', error);
    }

  }
