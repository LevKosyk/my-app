import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductById } from "../../action/productAction";
import { Button, Input, Stack, Box, FormLabel, Spinner, Alert, AlertIcon, Select } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const UpdateScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.currentProduct || {});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setCategory(product.category || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct({ id, name, description, price, category }));
    navigate("/products");
  };

  return (
    <div>
      <Navbar />
      <Box maxW="md" mx="auto" p={6}>
        {loading && <Spinner />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
            />
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              isRequired
            />
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              isRequired
            >
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
            </Select>
            <Button type="submit" colorScheme="blue">
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default UpdateScreen;
