import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from './Components/Header';
import Masonry from '@mui/lab/Masonry';
import Image from '../../components/Image';

import { getAllPhotos, getPhotosByCategoryId } from '../../services/PhotoServices';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

function Home() {

    const [photos, setPhotos] = useState([]);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (searchParams.get('category')) {
            getPhotosByCategoryId(searchParams.get('category')).then(data => setPhotos(data.photos));
        } else {
            getAllPhotos().then(data => setPhotos(data.photos));
        }
        setLoading(false);
    }, [searchParams]);

    if (loading) {
        return <Spinner />
    }

    return (
        <Box>
            <Header />
            <Box sx={{ px: 5, py: 5, display: 'flex', justifyContent: 'center', color: '#E61605' }}>
                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} >
                    {
                        photos.map((photo, index) => {
                            return <Image key={index} id={photo._id} title={photo.title} imageUrl={photo.imageUrl} publisher={photo.publisher} publisherName={photo.publisherName} />
                        })
                    }
                </Masonry>
            </Box>
        </Box>
    )
}

export default Home;