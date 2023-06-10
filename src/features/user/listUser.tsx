import React, { useEffect } from "react";
import {
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  CardFooter,
  SimpleGrid,
  VStack,
  Divider,
  Button,
  Stack,StackDivider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  IconButton,
  Input

} from "@chakra-ui/react";
import {  getUsers } from "../../services/user";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";


import { IUser } from "../../model/user";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const ListUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userList = useAppSelector((state) => state.user.list.values);

  const isLoadingTable = useSelector(
    (state: RootState) => state.user.list.isLoading
  );

  return (
    <Flex
      w="100%"
      maxWidth={1220}
      mx="auto"
      px="6"
      my="6"
      direction="column"
    >
      <Button
        maxWidth={120}
        my="4"
        ml="auto"
        colorScheme="green"
       
      >
        Tema {"Dark"}
      </Button>

      <Box
        flex="1"
        p="4"
        bg={"white"}
        borderRadius="md"
      >
        <Heading
          py="2"
          fontSize={["sm", "lg", "xl"]}
          fontWeight="black"
          color={"gray.600"}
        >
          Gerenciador de Usuários
        </Heading>

        <Flex
          justify="space-between"
          align="center"
          py="2"
        >
          <Flex
            flex="1"
            direction="row"
            align="center"
            border="1px"
            borderRadius="md"
            borderColor={ "gray.600"}
           >
            <IconButton
              size="sm"
              borderRadius="0"
              aria-label="pesquisar-usuario"
             
            />

            <Input
              size="sm"
              border="0"
              focusBorderColor="green.500"
              placeholder="Pesquisar..."
            />
          </Flex>

          <Button
            
            ml="4"
            size="sm"
            fontSize="sm"
            colorScheme="green"
           
            title="Cadastrar Usuário"
          >
            {<Text>Novo Usuário</Text>}
          </Button>

        
        </Flex>

        <Box
          border="1px"
          borderRadius="sm"
          borderColor={"gray.600"}
        >
          <Table size="sm">
            <Thead bg={ "light" }>
              <Tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Data de Cadastro</Th>
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
            {userList?.map((user: IUser) => (
            <Tr key={user.id}>
              <Td textAlign={"center"} fontSize={"16"}>
                {user.title}
              </Td>
              <Td textAlign={"center"} fontSize={"16"}>
                {user.body}
              </Td>
            </Tr>
          ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
/* <Box>
<Box w="100%">
<Box marginTop={"20px"} textAlign={"center"}>
  <Text
    fontSize={"25"}
    textDecoration={"underline"}
    textDecorationColor={"gray"}
    textDecorationThickness={"4px"}
    fontWeight="bold"
    marginBottom={"5"}
  >
    Student Details
  </Text>
</Box>
{isLoadingTable && (
        <div className="has-text-centered">Fetching...</div>
      )}
<Box margin="20px">
  <Box
    display={"flex"}
    flexDirection="column"
    justifyItems={"flex-start"}
    px="15px"
    py="15px"
    w="100%"
  >
    <TableContainer
      w="100%"
      display="block"
      height="550px"
      overflowY="auto"
    >
      <Table
        borderBlock={"2px solid"}
        variant="striped"
        colorScheme="teal"
      >
        <Thead borderBlockEnd={"2px solid"}>
          <Tr>
            <Th textAlign={"center"} fontSize={"16"}>
              First Name
            </Th>
            <Th textAlign={"center"} fontSize={"16"}>
              Last Name
            </Th>
            <Th textAlign={"end"} fontSize={"16"}>
              ACTIONS
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userList?.map((user: IUser) => (
            <Tr key={user.id}>
              <Td textAlign={"center"} fontSize={"16"}>
                {user.title}
              </Td>
              <Td textAlign={"center"} fontSize={"16"}>
                {user.body}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
   
  </Box>
</Box>
</Box>
</Box> */
  );
};

export default ListUser;