import { useState, useRef } from "react";
import { Container, Box, VStack, HStack, Text, Input, Button, Image, IconButton, SimpleGrid, useToast, Select } from "@chakra-ui/react";
import { FaShoppingCart, FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [ratings, setRatings] = useState({});
  const toast = useToast();
  const fileInputRef = useRef(null);

  const addProduct = () => {
    if (productName && productPrice && productImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProducts([...products, { name: productName, price: productPrice, image: reader.result }]);
        setProductName("");
        setProductPrice("");
        setProductImage("");
        toast({
          title: "Product added.",
          description: "Your product has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(productImage);
    } else {
      toast({
        title: "Error.",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    toast({
      title: "Product removed.",
      description: "Your product has been removed successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const rateProduct = (index, rating) => {
    setRatings({ ...ratings, [index]: rating });
    toast({
      title: "Product rated.",
      description: `You rated the product ${rating} stars.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Text fontSize="4xl" fontWeight="bold">
          Create Your Online Store
        </Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <Input placeholder="Product Price" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <Button onClick={() => fileInputRef.current.click()}>Upload Image</Button>
          <Input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={(e) => setProductImage(e.target.files[0])} />
          <IconButton aria-label="Add Product" icon={<FaPlus />} onClick={addProduct} />
        </HStack>
        <SimpleGrid columns={[1, 2, 3]} spacing={10} width="100%">
          {products.map((product, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
              <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" mx="auto" />
              <VStack spacing={2} mt={4}>
                <Text fontSize="xl" fontWeight="bold">
                  {product.name}
                </Text>
                <Text fontSize="lg" color="gray.500">
                  ${product.price}
                </Text>
                <HStack>
                  <Select placeholder="Rate" onChange={(e) => rateProduct(index, e.target.value)} value={ratings[index] || ""}>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </Select>
                  <Text>{ratings[index] ? `${ratings[index]} Stars` : "No rating yet"}</Text>
                  <IconButton aria-label="Remove Product" icon={<FaTrash />} onClick={() => removeProduct(index)} />
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
