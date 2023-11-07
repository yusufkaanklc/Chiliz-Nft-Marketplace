import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Avatar,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box ml={5} fontSize={20} onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <i className="fi fi-rr-brightness"></i> // eklenecek
      ) : (
        <i className="fi fi-rr-moon"></i> // eklenecek
      )}
    </Box>
  );
}

function Navbar() {
  const address = useAddress();

  return (
    <Box maxW={"1200px"} m={"auto"} py={"10px"} px={"40px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Link as={NextLink} className="link" href="/">
          <Heading>BlockMart</Heading>
        </Link>
        <Flex direction={"row"}>
          <Link as={NextLink} href="/buy" className="link" mx={2.5}>
            <Text>Buy</Text>
          </Link>
          <Link href="/sell" as={NextLink} className="link" mx={2.5}>
            <Text>Sell</Text>
          </Link>
        </Flex>
        <Flex direction={"row"} alignItems={"center"}>
          <ConnectWallet></ConnectWallet>
          {address && (
            <Link as={NextLink} href={`/profile/${address}`}>
              <Avatar src="https://bit.ly/broken-link" ml={"20px"}></Avatar>
            </Link>
          )}
          <ThemeSwitcher /> {/* Tema anahtarını burada ekleyin */}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
