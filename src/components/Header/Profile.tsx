import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData}: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rafael Teles Vital</Text> 
          <Text color="gray.300" fontSize="small">
            te_teles@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Rafael Teles" src="https://github.com/devteles.png" />
    </Flex>
  )
}