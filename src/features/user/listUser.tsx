import React, { useEffect,useState } from "react";
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
  Input,
  Icon

} from "@chakra-ui/react";
import {  getUsers } from "../../services/user";
import { MdAddCircleOutline, MdDelete, MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

import { IUser } from "../../model/user";
import Pagination from "../../components/pagination/Pagination";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const ListUser = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 20;
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
      <Card
        flex="1"
        p="4"
        bg={"white"}
        borderRadius="md"
        
      >
      <CardHeader background={"#3E597D"}>
        <Flex
          justify="space-between"
          align="center"
          py="2"
        >
        <Heading
          py="2"
          fontSize={["sm", "lg", "xl"]}
          fontWeight="black"
          color={"white"}
          >
          Gestionar Usario
        </Heading>
         <Box>
          <Button
            
            ml="4"
            size="sm"
            fontSize="sm"
            colorScheme="red"
            leftIcon={<Icon as={MdRemoveCircleOutline} boxSize={5}/>}
            title="Eliminar"
          >
            {<Text>Eliminar</Text>}
          </Button>
          <Button
            
            ml="4"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={MdAddCircleOutline} boxSize={5}/>}
            title="Nuevo Usuario"
          >
            {<Text>Nuevo Usuario</Text>}
          </Button>
         </Box>
        </Flex>
      </CardHeader>
      <CardBody
         border="1px"
         borderRadius="sm"
         borderColor={"gray.600"}>
        <Table size="sm">
            <Thead bg={ "light" }>
              <Tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Actions</Th>
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
              <Td textAlign={"end"} fontSize={"16"}>
                <Icon as={MdModeEdit}
                  color="yellow"
                  boxSize={5}
                  aria-label=""
                  marginRight="1rem"
                />
                       
                <Icon as={MdDelete}
                  color="red"
                  boxSize={5}
                  aria-label=""
                  onClick={()=>{alert("asds")}}
                />
              </Td>
            </Tr>
          ))}
            </Tbody>
        </Table>
      </CardBody>
      <CardFooter>
        
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
      </CardFooter>
      </Card>
    </Flex>
  );
};

export default ListUser;