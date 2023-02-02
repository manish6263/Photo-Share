import axios from "axios";

// Get user.........
export const getUser = async (userId) => {
    const { data } = await axios.get(`/users/${userId}`);
    return data;
};

// Follow user.........
export const followUser = async (follwerId, followedId) => {
    await axios.post(`/users/${followedId}/followers/${follwerId}`);
};

// Unfollow user.........
export const unfollowUser = async (follwerId, followedId) => {
    await axios.delete(`/users/${followedId}/followers/${follwerId}`);
};

// Set profile photo......
export const setProfilePhoto = async (userId, image) => {
    const { data } = await axios.put(`/users/${userId}/photo`, {
        imageUrl: image
    });
    return data;
};