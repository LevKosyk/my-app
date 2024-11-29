import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../action/productAction";

import { Button, Input, Stack, Box, FormControl, FormLabel } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CreateScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("beauty");

  const dispatch = useDispatch();
  const navigate= useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      createProduct({
        name,
        description,
        price: parseFloat(price), 
        category,
      })
    );
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    navigate('/products')
  };

  return (
    <div>
      <Navbar />
      <Box maxW="md" mx="auto" mt={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
            </select>
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateScreen;
