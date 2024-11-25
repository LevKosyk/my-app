import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts, deleteProduct } from "../features/post/productsSlice";
import Navbar from "./Navbar";
import CustomMenu from "./UI/custimMenu";

const ProductsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);

  const handleDelete = (id: number) => {
    console.log(`Delete product with id: ${id}`);
    dispatch(deleteProduct(id))
  };


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) return <h2>Error: {error}</h2>;

  return (
    <Box>
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <CustomMenu />
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
          {Array.isArray(products) && products.length > 0 ? (
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
            <Flex justify="center" align="center" p={4}>
              <Text>No products found.</Text>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;
