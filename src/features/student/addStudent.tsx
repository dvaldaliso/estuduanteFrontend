import React, { useEffect,useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
 Box,
 Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  CardFooter,
  FormLabel,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Input,
  Icon
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react'
import { addStudent, deleteStudent, getStudents, updateStudent } from "../../services/student";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import DeleteStudentModel from "./deleteStudentModel";
import { IStudent } from "../../model/stundent";
import { useForm } from "react-hook-form";
import { MdAddCircleOutline, MdDelete, MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md'

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddStudent = () => {
  const dispatch = useAppDispatch();
  const toast = useToast()

  const modalAddButton = useDisclosure();
  const modalDeleteButton = useDisclosure();
  const modalErrorButton = useDisclosure();

  const cancelRefError = React.useRef<HTMLDivElement>(null);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [selectedId, setSelectedId] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);
 

  const studentList = useAppSelector((state) => state.student.list.values);

  const isLoadingTable = useSelector(
    (state: RootState) => state.student.list.isLoading
  );
  const isSaving = useSelector(
    (state: RootState) => state.student.save.isSaving
  );
  const isDeleting = useSelector(
    (state: RootState) => state.student.save.isDeleting
  );
  
 
  const [student, setStudent] = useState<IStudent>({
    id: 0,
    firstName: "",
    lastName: "",
    age: 0,
    email:"",
    grade:"",
  });
  const {
    register, reset
  } = useForm({
    defaultValues: student,
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
   
  };


  const OnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    

    if (student.firstName === "") {
      setShowAlert(true);
      return;
    }
    console.log(student)
    //const action = student.id === 0?addStudent({...student,id:Date.now()}): updateStudent(student);;
   let action: any;
    if(student.id === 0){
      action = addStudent({...student,id:Date.now()})
    }else{
      action =updateStudent(student)
    }

    dispatch(action)
      .unwrap()
      .then((response: any) => {
        reset();
        dispatch(getStudents());
      })
      .catch((error: any) => {
        
      });
      modalAddButton.onClose();
  };

  const openDeleteAlert = (id: any) => {
    setSelectedId(id);
    modalDeleteButton.onOpen();
  };


  const editData = (student: any) => {
    modalAddButton.onOpen();
    setStudent(student)
    reset(student)
    return;
  };

  const handleDelete = (id: any) => {
    dispatch(deleteStudent(id));
    modalDeleteButton.onClose();
    resetForm();
  };

  const resetForm = () => {
    setStudent({
      id: 0,
      firstName: "",
      lastName: "",
      age: 0,
      email:"",
      grade:"",
    });
    setShowAlert(false);
  };

  const onCancel = () => {
    modalAddButton.onClose();
    reset();
  };

  return (
    <Flex
    w="100%"
    maxWidth={1220}
    mx="auto"
    px="6"
    my="6"
    direction="column"
  >
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
        Gestionar Usuario
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
          onClick={modalAddButton.onOpen}
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
                    <Th textAlign={"center"} fontSize={"16"}>
                    Age
                    </Th>
                    <Th textAlign={"center"} fontSize={"16"}>
                    Gmail
                    </Th>
                    <Th textAlign={"center"} fontSize={"16"}>
                      Grado
                    </Th>
                    <Th textAlign={"end"} fontSize={"16"}>
                      ACTIONS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {studentList?.map((student: IStudent) => (
                    <Tr key={student.id}>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.firstName}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.lastName}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.age}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.email}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.grade}
                      </Td>
                      <Td textAlign={"end"} fontSize={"16"}>
                        <Icon as={MdModeEdit}
                          color="yellow"
                          boxSize={5}
                          aria-label=""
                          marginRight="1rem"
                          onClick={() => editData(student)}
                        />
                              
                        <Icon as={MdDelete}
                          color="red"
                          boxSize={5}
                          aria-label=""
                          onClick={() => openDeleteAlert(student.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
        </Table>
    </CardBody>
    <CardFooter>
    </CardFooter>
    </Card>
    <DeleteStudentModel
        isOpen={modalDeleteButton.isOpen}
        onClose={modalDeleteButton.onClose}
        handleDelete={handleDelete}
        selectedId={selectedId}
        />
    <Box textAlign={"end"} marginBottom={"5"}>
       <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={modalAddButton.isOpen}
                onClose={modalAddButton.onClose}
                isCentered={true}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter Your Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl >
                      <FormLabel>First Name</FormLabel>
                      <Input
                      type="text"
                      placeholder="First name"
                      {...register("firstName", {
                        required: "Please enter first name",
                        minLength: 3,
                        maxLength: 80
                      })}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired isInvalid={student.lastName===""}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        placeholder="Enter Last name"
                        {...register("lastName", {
                          required: "Please enter Last name",
                          minLength: 3,
                          maxLength: 80
                        })}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                    <FormControl >
                      <FormLabel>Age</FormLabel>
                      <Input
                      type="text"
                      placeholder="Age"
                      {...register("age", {
                        required: "Please enter first name",
                      })}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired isInvalid={student.lastName===""}>
                      <FormLabel>Email</FormLabel>
                      <Input
                      type="text"
                        placeholder="Enter email"
                        {...register("email", {
                          minLength: 3,
                          maxLength: 80
                        })}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={student.lastName===""}>
                      <FormLabel>Grade</FormLabel>
                      <Input
                      type="text"
                        placeholder="Enter Grade"
                        {...register("grade")}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button 
                    colorScheme="blue" 
                    mr={3}
                    loadingText={isSaving}
                    onClick={OnSubmit}>
                      Save
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
       </Modal>
    </Box>
  </Flex>
  );
};

export default AddStudent;