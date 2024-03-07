import React from 'react'
import Iframe from 'react-iframe'

const Stream = () => {
    const containerStyle = {
        width: '100%',
        height:'382.8px',
        overflow: 'hidden', // Ẩn thanh kéo của div chứa iframe
    };
    const iframeStyle = {
        width: '100%',
        height: '100%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Hiệu ứng đen mờ với độ trong suốt 0.5
    };
  return (
    <div style={containerStyle}>
        <Iframe url="http://192.168.83.196:5000/"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"
        styles={iframeStyle}

        />
    </div>
  )
}

export default Stream