import { Input } from "@/components/Form/Input";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSingIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" alignItems={"center"} justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing={4}>
          <Input
            label="E-mail"
            type="email"
            {...register("email", { required: "E-mail obrigatório" })}
            error={formState.errors.email as FieldError}
          />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={formState.errors.password as FieldError}
          />
        </Stack>
        <Button
          type="submit"
          marginTop={6}
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
