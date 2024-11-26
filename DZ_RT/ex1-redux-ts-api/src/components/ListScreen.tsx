import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts, deleteProduct, getProductByCategory } from "../features/post/productsSlice";
import Navbar from "./Navbar";

const ProductsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);
  const [category, setCategory] = useState("");

  const handleDelete = (id: number) => {
    console.log(`Delete product with id: ${id}`);
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (category === "") {
      dispatch(fetchProducts());
    } else {
      dispatch(getProductByCategory(category));
    }
  }, [dispatch, category]);

  const handelChange = (category: string) => {
    setCategory(category);
  };

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <select
            name="category"
            value={category}
            onChange={(e) => handelChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
          </select>
        </Flex>
        <Flex
          justify="space-between"
          bg="blue.200"
          p={4}
          fontWeight="bold"
          borderRadius="md"
          boxShadow="sm"
        >
          <Text flex={1}>Id</Text>
          <Text flex={2}>Name</Text>
          <Text flex={2}>Category</Text>
          <Text flex={3}>Description</Text>
          <Text flex={1}>Price</Text>
          <Text flex={1} textAlign="center">Action</Text>
        </Flex>
        <Box mt={4}>
          {products.length > 0 ? (
            products.map((item) => (
              <Flex
                key={item.id}
                justify="space-between"
                align="center"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
                _hover={{ bg: "blue.50" }}
              >
                <Text flex={1}>{item.id}</Text>
                <Text flex={2}>{item.name}</Text>
                <Text flex={2}>{item.category}</Text>
                <Text flex={3}>{item.description}</Text>
                <Text flex={1}>${item.price}</Text>
                <Flex flex={1} justify="center">
                  <Button
                    colorScheme="red"
                    size="sm"
                    mr={2}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                  <Button colorScheme="blue" size="sm">
                    <Link to={`/update/${item.id}`}>Update</Link>
                  </Button>
                </Flex>
              </Flex>
            ))
          ) : (
            <Box textAlign="center" py={4}>
              <Text fontSize="lg" color="gray.500">
                No products found in this category.
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;
