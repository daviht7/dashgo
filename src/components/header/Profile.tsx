import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align={"center"}>
      {showProfileData && (
        <Box mr="4" textAlign={"right"}>
          <Text>Davi Holanda</Text>
          <Text color="gray.300" fontSize={"small"}>
            daviht7@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Davi Holanda"
        src="https://github.com/daviht7.png"
      />
    </Flex>
  );
}
