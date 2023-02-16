import { Input } from "@/components/Form/Input";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No Mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);
    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight={"normal"}>
            Criar usuário
          </Heading>

          <Divider my="6" borderColor={"gray.700"} />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                label="Nome Completo"
                {...register("name")}
                error={formState.errors.name as FieldError}
              />
              <Input
                label="E-mail"
                type="email"
                {...register("email")}
                error={formState.errors.email as FieldError}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Senha"
                {...register("password")}
                error={formState.errors.password as FieldError}
              />
              <Input
                label="Confirmação da senha"
                type="password"
                {...register("password_confirmation")}
                error={formState.errors.password_confirmation as FieldError}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justifyContent={"flex-end"}>
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
