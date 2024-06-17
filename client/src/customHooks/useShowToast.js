import { useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description,
    status,
    duration,
    isClosable,
    position,
  }) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: duration ? duration : 3000,
      isClosable: isClosable ? isClosable : true,
      position: position ? position : "top-right",
    });
  };

  return { showToast };
};

export default useShowToast;
