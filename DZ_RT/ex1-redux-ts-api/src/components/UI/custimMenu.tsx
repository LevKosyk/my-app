import React, { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";

const CustomMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Box position="relative" display="inline-block">
      {/* Кнопка для открытия меню */}
      <Button onClick={toggleMenu} >
        Actions
      </Button>

      {/* Само меню */}
      {isOpen && (
        <VStack
          position="absolute"
          top="100%"
          left="0"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          zIndex="10"
          p={2}
          align="stretch"
        >
          <Button variant="ghost" onClick={() => alert("Option 1")} onBlur={closeMenu}>
            Option 1
          </Button>
          <Button variant="ghost" onClick={() => alert("Option 2")} onBlur={closeMenu}>
            Option 2
          </Button>
          <Button variant="ghost" onClick={() => alert("Option 3")} onBlur={closeMenu}>
            Option 3
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default CustomMenu;
