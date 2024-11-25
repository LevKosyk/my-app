import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/post/productsSlice";

import { Box, Button, Input, Select, Stack, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { AppDispatch } from "../store";

import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

const CreateScreen = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("beauty");

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const product: Product = {
            id: 0, 
            name: name,
            price: Number(price),
            category: category,
            description: description,
        };

        try {
            await dispatch(createProduct(product)).unwrap(); 
            setName("");
            setDescription("");
            setPrice("");
            setCategory("beauty"); 
            navigate("/products");
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <Box
                maxW="md"
                mx="auto"
                mt={10}
                p={6}
                boxShadow="md"
                borderRadius="md"
                bg="white"
            >
                <Heading size="lg" mb={6}>
                    Create Product
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                        />
                        <Input
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                        />
                        <Input
                            name="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product price"
                        />
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="beauty">Beauty</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="furniture">Furniture</option>
                        </select>
                        <Button type="submit" colorScheme="blue" width="full">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default CreateScreen;
