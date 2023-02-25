import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {getProductsAsync} from '../features/product/productsSilce';
import {selectAccess} from '../features/login/loginSlice';
import {productUpload} from '../features/product/productUpAPI'

const ProductUp = () => {
    const access = useAppSelector(selectAccess);
    // const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFile, setUploadedFile] = useState<any | null>(null);
    const [category, setCategory] = useState("1")
    const [currency, setCurrency] = useState("1")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0]);
    };

    const handleUpload = async () => {
        console.log("first")
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append("category", category);
        formData.append("currency", currency);
        formData.append("title", title);
        formData.append("description", description);
        formData.append('image', selectedFile);
        formData.append("price", price);
        // formData.append("userId", userId.toString());

        console.log(formData)
        try {
            const response = await productUpload(access, formData) 
                

            console.log(response.data)
            setUploadedFile(response.data.image);
            dispatch(getProductsAsync(access)) //should be with access
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div>
                <form action="/action_page.php" />
                <label htmlFor="Category">Category:</label>
                <select onChange={(e) => setCategory(e.target.value)} name="category" id="Category">
                <option value="1">Shoes</option>
                <option value="2">Clothing</option>
                </select>

                <br></br>

            </div>
            <div>
                <form action="/action_page.php" />
                <label htmlFor="Currency">Currency:</label>
                <select onChange={(e) => setCurrency(e.target.value)} name="currency" id="currency">
                    <option value="1">₪</option>
                    <option value="2">$</option>

                </select>

                <br></br>
            </div>
            {/* Category:<input  onChange={(e)=>setCategory(e.target.value)} /> */}
            {/* currency:<input onChange={(e) => setCurrency(e.target.value)} /> */}
            Price:<input onChange={(e) => setPrice(e.target.value)} />
            <br></br>
            Title:<input onChange={(e) => setTitle(e.target.value)} />
            <br></br>
            Description:<input onChange={(e) => setDescription(e.target.value)} />
            <br></br>
            {uploadedFile && <p>Uploaded file: {uploadedFile}</p>}
        </div>
    );
};

export default ProductUp;

