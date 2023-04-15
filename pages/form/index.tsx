import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

interface FormData {
    name: string;
    email: string;
    images: FileList | null;
}

const Form = () => {
    const [images, setImages] = useState<File[]>([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
        onDrop: (acceptedFiles) => {
            const filteredFiles = acceptedFiles.filter((file) => {
                const fileType = file.type.split("/")[0];
                return fileType === "image";
            });
            setImages([...images, ...filteredFiles]);
        },
    });

    const handleRemoveImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const onSubmit = (data: FormData) => {
        console.log(data);
        console.log(images);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white p-5">
            <div className="border border-gray-300 flex">
                <pre>
                    {
                        JSON.stringify(watch(), null, 2)
                    }
                </pre>
                <label htmlFor="name" className="block">Name</label>
                <input type="text" id="name" {...register("name", { required: true })} className="bg-gray-100 border border-black" />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" {...register("email", { required: true })} className="bg-gray-100 border border-black" />
                {errors.email && <span>This field is required</span>}
            </div>
            <div {...getRootProps()} className="h-48 bg-red-100 flex w-72 justify-center items-center border border-gray-500">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
            {images.length > 0 && (
                <div>
                    <h4>Selected Images:</h4>
                    <div style={{ display: "flex" }}>
                        {images.map((image, index) => (
                            <div key={index} style={{ marginRight: "10px" }}>
                                <img src={URL.createObjectURL(image)} alt={`image-${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button type="submit" className="border border-black">Submit</button>
        </form>
    );
};
const Home = () => {
    return (
        <main className="min-h-screen flex">
            <div className="flex justify-center items-center bg-blue-100">
                <Form />
            </div>
        </main>

    );
};

export default Home;
