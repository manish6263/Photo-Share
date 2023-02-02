import axios from "axios";

// Get all photos.....
export const getAllPhotos = async () => {
    const { data } = await axios.get('/photos');
    return data;
};

// Get photos by userId.....
export const getPhotosByUserId = async (userId) => {
    const { data } = await axios.get(`/photos/publisher/${userId}`);
    return data;
};

// Get photos by userId.....
export const getPhotosByCategoryId = async (categoryId) => {
    const { data } = await axios.get(`/photos/category/${categoryId}`);
    return data;
};

// Get photos by Id.....
export const getPhotoById = async (photoId) => {
    const { data } = await axios.get(`/photos/${photoId}`);
    return data;
};

// Add photo........
export const addPhoto = async (imageUrl, title, description, category, publisher, publisherName) => {
    const { data } = await axios.post('/photos/', {
        imageUrl,
        title,
        description,
        category,
        publisher,
        publisherName
    });
    return data;
};

// Upload photo to cloudinary........
export const uploadPhotoToCloudinary = async (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    const result = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data
    })
        .then(async (res) => await res.json());
    return result;
};

// Update photo.......
export const updatePhoto = async (photoId, title, description, category) => {
    const { data } = await axios.put(`/photos/${photoId}`, {
        title,
        description,
        category
    });
    return data;
};

// Delete photo.......
export const deletePhoto = async (photoId) => {
    const { data } = await axios.delete(`/photos/${photoId}`);
    return data;
};

// LIKE SYSTEM......

// Add like........
export const addLike = async (photoId, likerId) => {

    await axios.put(`/photos/${photoId}/likes/${likerId}`, {
        liker: likerId
    });
};

// Remove like.......
export const removeLike = async (photoId, likerId) => {
    const id = likerId;
    await axios.delete(`/photos/${photoId}/likes/${likerId}`, {
        liker: id
    });
};