import React from 'react';

const ChangePhoto = () => {

    return (
        <div className="change-photo">
            <img src={require('../../../styles/images/image2.jpeg')} alt="doggo"/>
            <button>Change Photo</button>
        </div>
    );
}

export default ChangePhoto

