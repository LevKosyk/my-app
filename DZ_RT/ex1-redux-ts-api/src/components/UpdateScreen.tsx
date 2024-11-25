import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct, getProductById } from "../features/post/productsSlice";
import { Input, Button, Stack, Spinner, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

const UpdateScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const product = await dispatch(getProductById(Number(id))).unwrap();
          if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || 0);
            setCategory(product.category || "");
          }
        }
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct: Product = {
      id: Number(id),
      name,
      description,
      price,
      category,
    };

    try {
      await dispatch(updateProduct(updatedProduct)).unwrap();
      navigate("/products");
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <Spinner size="xl" mt={10} mx="auto" display="block" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Text color="red.500" mt={10} textAlign="center">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Stack maxW="md" mx="auto" my={8}>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />

          <Input
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />

          <Input
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter product price"
          />

          <select
            name="category"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
          >
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
          </select>

          <Button type="submit" colorScheme="teal" alignSelf="flex-start">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UpdateScreen;
