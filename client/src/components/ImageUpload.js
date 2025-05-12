import React, { useState } from 'react';

function ImageUpload() {
    const [imageUrl, setImageUrl] = useState(null);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('receipt', file);

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
            <h2>이미지 파일 업로드</h2>
            <input type="file" accept="image/*" onChange={handleChange} />
            {imageUrl && (
                <div>
                    <h3>업로드된 이미지:</h3>
                    <img src={imageUrl} alt="Uploaded" width="300" />
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
