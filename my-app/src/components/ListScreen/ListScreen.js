import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Menu, MenuButton, MenuList, MenuItem as ChakraMenuItem } from "@chakra-ui/react";
import { fetchProducts, searchByCategoriesProducts, deleteProduct } from "../../action/productAction";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const ListScreen = () => {
  const dispatch = useDispatch();
  const { products, status,error } = useSelector((state) => state.products)
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category) {
      dispatch(searchByCategoriesProducts(category));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, category]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).catch((err) => {
      console.error("Ошибка при удалении продукта:", err);
    });
  };

  return (
    <Box>
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Menu>
            <MenuButton as={Button} variant="outline">
              {category || "Выберите категорию"}
            </MenuButton>
            <MenuList>
              <ChakraMenuItem onClick={() => setCategory("")}>Все</ChakraMenuItem>
              <ChakraMenuItem onClick={() => setCategory("beauty")}>Косметика</ChakraMenuItem>
              <ChakraMenuItem onClick={() => setCategory("fragrances")}>Парфюмерия</ChakraMenuItem>
              <ChakraMenuItem onClick={() => setCategory("furniture")}>Мебель</ChakraMenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {status === "loading" ? (
          <Flex justify="center" align="center" height="200px">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : error ? (
          <Box color="red.500" textAlign="center" mt={4}>
            Ошибка: {error}
          </Box>
        ) : (
          <Table variant="striped" colorScheme="gray" size="md">
            <Thead bg="blue.100">
              <Tr>
                <Th>ID</Th>
                <Th>Название</Th>
                <Th>Категория</Th>
                <Th>Описание</Th>
                <Th>Цена</Th>
                <Th textAlign="end">Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((item) => (
                  <Tr key={item.id} _hover={{ bg: "blue.50" }}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.description}</Td>
                    <Td>${item.price.toFixed(2)}</Td>
                    <Td textAlign="end">
                      <Button colorScheme="red" size="sm" mr={2} onClick={() => handleDelete(item.id)}>
                        Удалить
                      </Button>
                      <Button as={Link} to={`/update/${item.id}`} colorScheme="blue" size="sm">
                        Обновить
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="6" textAlign="center">
                    Продукты не найдены.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default ListScreen;
