import React, { useRef } from 'react';

function WebcamCapture({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('웹캠 접근 실패:', err);
        }
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(onCapture, 'image/jpeg');
    };

    return (
        <div>
            <video ref={videoRef} width="300" autoPlay playsInline />
            <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />
            <br />
            <button onClick={startWebcam}>웹캠 시작</button>
            <button onClick={captureImage}>촬영 및 업로드</button>
        </div>
    );
}

export default WebcamCapture;
