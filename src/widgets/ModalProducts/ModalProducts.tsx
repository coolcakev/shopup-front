import React, {useEffect, useRef} from 'react';
import './ModalProducts.scss';
import Modal from '../../shared/components/Modal/Modal';
import FormInput from '../../shared/components/Input/FormInput/FormInput';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import TextArea from '../../shared/components/TextArea/TextArea';
import * as yup from 'yup';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {GetAllProductResponse, IProduct, ProductImage} from '../../entities/Product/product.models';
import {useAddProductMutation, useDeleteProductMutation} from "../../entities/Product/api/productApi";
import ImgWithDeleteIcon from "./components/img-with-delete-icon/img-with-delete-icon";

interface PropTypes {
    onClose?: () => void;
    productToEdit?: GetAllProductResponse;
}

const validFileFormats = ['image/jpeg', 'image/jpg', 'image/png'];

const yupSchema = yup.object({
    price: yup.number().required('Price is required'),
    name: yup.string().required('Product name is required'),
    description: yup.string().required('Description is required'),
    images: yup.mixed().required('At least one image is required')
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

const handleImageLoad = (files: ProductImage[]) => {
    const convertedFiles = files.map(file => {
        const newFile: FileAndType = {
            id: file.key,
            link: file.link,
            type: FileType.None
        }
        return newFile;
    })

    return convertedFiles;
};

const handleAddFiles = (files: FileList) => {
    const convertedFiles = Array.from(files).map(file => {
            const newFile: FileAndType = {
                id: (Math.random() + 1).toString(36).substring(2),
                file: file,
                type: FileType.Add
            }
            return newFile;
        }
    )

    return convertedFiles;
};

export enum FileType {
    None,
    Delete,
    Add
}

export interface FileAndType {
    id?: string;
    file?: File;
    link?: string;
    type: FileType;
}

const ModalProducts = (props: PropTypes) => {
    const {
        onClose,
        productToEdit
    } = props;

    const [deleteProduct] = useDeleteProductMutation();
    const [addProductMutation] = useAddProductMutation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRefSmall = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues
    } = useForm<YupSchemaType>({
        resolver: yupResolver(yupSchema),
        defaultValues: {
            price: productToEdit?.price,
            name: productToEdit?.name,
            images: handleImageLoad(productToEdit?.images ?? []),
            description: productToEdit?.description,
        },
    });

    const images = watch('images') as FileAndType[];

    const filteredImages: FileAndType[] = images.filter(image => image.type !== FileType.Delete);

    const handleAddOrEditProduct = async (data: YupSchemaType) => {

        const requestImages = data.images as FileAndType[];

        const filesForAdd = requestImages.filter(image=>image.type === FileType.Add);
        const filesForDelete = requestImages.filter(image=>image.type === FileType.Delete);

        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price.toString());

        for (let i = 0; i < filesForAdd.length; i++) {
          formData.append("files", filesForAdd[i].file!);
        }

        formData.append("imagesToDelete", JSON.stringify(filesForDelete.map(file=>file.id)));

        if (data.description) formData.append("description", data.description);
        if (productToEdit?._id) formData.append("productId", productToEdit?._id!);

        addProductMutation(formData).unwrap();
        onClose?.();
    };

    const handleImagesChange = (files: FileList, isSmall: boolean = false) => {
        const currentSecImages: FileAndType[] = watch('images') as FileAndType[];

        const convertedFiles = handleAddFiles(files);

        const updatedSecImages = isSmall
            ? [...currentSecImages, ...convertedFiles]
            : [convertedFiles[0], ...currentSecImages.slice(1)];

        setValue('images', updatedSecImages);
    };

    const onSubmitHandler: SubmitHandler<YupSchemaType> = async (data) => {
        try {
            await handleAddOrEditProduct(data);
        } catch (e) {
            console.log(e);
        }
    };

    const onDeleteHandler = () => {
        productToEdit?._id && deleteProduct(productToEdit._id);
    };

    const onError: SubmitErrorHandler<any> = async (value: any) => {
        console.log("Error", value)
    }

    const handleDeleteImg = (file: FileAndType) => {
        const getImages = getValues('images') as FileAndType[];
        const image = getImages.find(image=> image.id === file.id);
        if (!image) return;

        if (image.file){
            setValue("images", getImages.filter(item => item.id !== image.id));
            return;
        }

        image.type = FileType.Delete;
        setValue("images", getImages);
    }

    return (
        <Modal onClose={onClose}>
            <form className="modal-products" onSubmit={handleSubmit(onSubmitHandler, onError)}>
                <div className="modal-pictures">
                    {filteredImages.length ? (
                        <img
                            src={filteredImages[0]?.link ?? URL.createObjectURL(filteredImages[0]?.file ?? new Blob())}
                            alt="prim-img"
                            className="prim-image"
                        />
                    ) : (
                        <PlusButton
                            bottomLabel="Add Cover"
                            onClick={() => fileInputRef?.current?.click()}
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}}
                        ref={fileInputRef}
                        onChange={(e: any) => handleImagesChange(e.target.files, false)}
                    />
                    <div className="pictures-small">
                        {
                            filteredImages.slice(1, 10).map((image, index) => (
                                <ImgWithDeleteIcon key={index} image={image} onClick={handleDeleteImg}/>
                            ))
                        }
                        {filteredImages.length < 10 && (
                            <PlusButton
                                onClick={() => fileInputRefSmall?.current?.click()}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            style={{display: 'none'}}
                            ref={fileInputRefSmall}
                            onChange={(e: any) => handleImagesChange(e.target.files, true)}
                            multiple
                        />
                    </div>
                </div>
                <div className="modal-inputs">
                    <div className="inputs-main">
                        <FormInput
                            placeholder='Price'
                            {...register('price')}
                            className='price-input'
                        />
                        <FormInput
                            placeholder='Title'
                            {...register('name')}
                            className='name-input'
                        />
                    </div>
                    <TextArea
                        placeholder='Description'
                        className='desc-input'
                        {...register('description')}
                    />
                </div>
                {productToEdit?._id
                    ?
                    <div className='modal-buttons'>
                        <SubmitButton label="Delete" onClick={() => onDeleteHandler()} type="button"/>
                        <SubmitButton label="Save Changes" type="submit"/>
                    </div>
                    :
                    <SubmitButton label="Create New" type="submit"/>
                }
            </form>
        </Modal>
    );
};

export default ModalProducts;