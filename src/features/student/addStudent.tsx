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
  FormLabel,
  Input,
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { addStudent, deleteStudent, getStudents, updateStudent } from "../../services/student";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import DeleteStudentModel from "./deleteStudentModel";
import { IStudent } from "../../model/stundent";
import { useForm } from "react-hook-form";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddStudent = () => {
  const dispatch = useAppDispatch();
  

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
        //toast.success(response);
        reset();
        dispatch(getStudents());
      })
      .catch((error: any) => {
        //toast.error(error);
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
    <Box>
      <Box>
        {showAlert && (
          <AlertDialog
            isOpen={modalErrorButton.isOpen}
            leastDestructiveRef={cancelRefError}
            onClose={modalErrorButton.onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Alert
                </AlertDialogHeader>

                <AlertDialogBody>Please Fill All Required Data</AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    colorScheme="red"
                    onClick={modalErrorButton.onClose}
                    ml={3}
                  >
                    Ok
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Box>
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
        <Box margin="20px">
          <Box
            display={"flex"}
            flexDirection="column"
            justifyItems={"flex-start"}
            px="15px"
            py="15px"
            w="100%"
          >
            <Box textAlign={"end"} marginBottom={"5"}>
              <Button onClick={modalAddButton.onOpen} colorScheme="green">
                ADD
              </Button>
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
                  {studentList?.map((student: IStudent) => (
                    <Tr key={student.id}>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.firstName}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {student.lastName}
                      </Td>
                      <Td textAlign={"end"} fontSize={"16"}>
                        <IconButton
                          color="#fff"
                          backgroundColor={"blackAlpha.600"}
                          aria-label=""
                          icon={<EditIcon />}
                          marginRight="1rem"
                          onClick={() => editData(student)}
                        />
                        <IconButton
                          color="#1a202c"
                          backgroundColor={"whitesmoke"}
                          border={"1px solid"}
                          aria-label=""
                          icon={<DeleteIcon />}
                          onClick={() => openDeleteAlert(student.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <DeleteStudentModel
              isOpen={modalDeleteButton.isOpen}
              onClose={modalDeleteButton.onClose}
              handleDelete={handleDelete}
              selectedId={selectedId}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddStudent;