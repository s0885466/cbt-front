import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Flex,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { validateEmail } from "@src/utils/validators";
import { AuthService } from "@src/services/AuthService";
import { useHttpClient } from "@src/hooks/useHttpClient";

type FormValues = {
  email: string;
  password: string;
};

const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const response = await sendRequest(() =>
      AuthService.signup(email, password)
    );

    if (response) {
      localStorage.setItem("token", response.accessToken);
    }
  };

  return (
    <Flex sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <Box w={80} p={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box h={100}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="name"
                {...register("email", {
                  required: "This is required",
                  validate: validateEmail,
                })}
              />
              <FormErrorMessage>
                {errors.email ? errors.email.message : " f"}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box h={100}>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 6,
                    message: "Minimum length should be 6",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Signin
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Registration;
