import React, { useState } from "react";
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
import { addNewStudent, updateStudent, deleteStudent } from "./studentSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import DeleteStudentModel from "./deleteStudentModel";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddStudent = () => {
  const modalAddButton = useDisclosure();
  const modalDeleteButton = useDisclosure();
  const modalErrorButton = useDisclosure();

  const cancelRefError = React.useRef<HTMLDivElement>(null);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [age, setAge] = useState<string | undefined>("");
  const [grade, setGrade] = useState<string | undefined>("");
  const [ids, setId] = useState<string | undefined>("");
  const [selectedId, setSelectedId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const isError = firstName === "";
  const isErrorAuthor = lastName === "";

  console.log(isError);
  const studentList = useAppSelector((state) => state.student.studentList);

  const handleOnSubmit = () => {
    if (ids) {
      modalAddButton.onClose();
      dispatch(updateStudent({ firstName, lastName,email,age,grade, id: ids }));
      clearInputs();
      return;
    } else {
      if (firstName && lastName) {
        const userData = {
          firstName,
          lastName,
          email,
          age,
          grade,
          id: studentList.length,
        };
        let oldData =
          JSON.parse(localStorage.getItem("userData") as string) || [];

        localStorage.setItem(
          "userData",
          JSON.stringify([...oldData, userData])
        );
        dispatch(addNewStudent(userData));
        clearInputs();
        modalAddButton.onClose();
      } else {
        modalErrorButton.onOpen();
        setShowAlert(true);
      }
    }
  };

  const openDeleteAlert = (id: any) => {
    setSelectedId(id);
    modalDeleteButton.onOpen();
  };

  const something = (event: any) => {
    if (event.keyCode === 13) {
      handleOnSubmit();
    }
  };

  const editData = (student: any) => {
    modalAddButton.onOpen();
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setId(student.id);
    return;
  };

  const handleDelete = (id: any) => {
    dispatch(deleteStudent(id));
    modalDeleteButton.onClose();
    clearInputs();
  };

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setId("");
  };

  const onCancel = () => {
    modalAddButton.onClose();
    clearInputs();
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
                    <FormControl isRequired isInvalid={isError}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        ref={initialRef}
                        value={firstName}
                        placeholder="Enter First Name"
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired isInvalid={isError}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        value={lastName}
                        placeholder="Enter Last name"
                        blur={lastName}
                        onChange={(e) => setLastName(e.currentTarget.value)}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleOnSubmit}>
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
                  {studentList?.map((student) => (
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