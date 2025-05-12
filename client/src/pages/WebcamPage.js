import React, { useState } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import ImageUpload from '../components/ImageUpload';

function WebcamPage() {
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = async (blob) => {
        const formData = new FormData();
        formData.append('receipt', blob);

        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/receipts/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await res.json();
        setImageUrl(`http://localhost:5000/${data.imagePath}`);
    };

    return (
        <div>
            <h2>영수증 업로드</h2>

            <WebcamCapture onCapture={uploadImage} />
            <hr />
            <ImageUpload />

            {imageUrl && (
                <div>
                    <h3>웹캠 촬영 이미지 (서버 저장 결과):</h3>
                    <img src={imageUrl} alt="Captured" width="300" />
                </div>
            )}
        </div>
    );
}

export default WebcamPage;
