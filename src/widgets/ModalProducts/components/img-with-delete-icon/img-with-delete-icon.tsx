import React from 'react';
import {FileAndType} from "../../ModalProducts";
import "./img-with-delete-icon.scss";

export interface ImgWithDeleteIconProps{
    image:  FileAndType
    onClick: (file: FileAndType) => void
    className?: string
}

const ImgWithDeleteIcon = (props: ImgWithDeleteIconProps) => {
    const { image, className= "img-extra",onClick} = props;
    return (
        <div className="img-delete-container">
            <img
                src={image.link ?? URL.createObjectURL(image.file ?? new Blob())}
                alt="img-extra"
                className={className}
            />
            <div className="img-delete-icon" onClick={()=>onClick(image)}>
                <img src="/assets/icons/Trash.svg" alt="trash"/>
            </div>
        </div>
    );
};

export default ImgWithDeleteIcon;