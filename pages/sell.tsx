import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import { Box, Button, Card, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { NFT_COLLECTION_ADDRESS } from "../const/addresses"
import NFTGrid from "../components/NFTGrid";
import SaleInfo from "../components/SaleInfo"

export default function Sell() {
    // Load all of the NFTs from the NFT Collection
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);

    const [selectedNft, setSelectedNft] = useState<NFTType>();

    return (
        <Container maxW={"1200px"} p={5}>
            <Heading>Sell NFTs</Heading>
            <Text>Select which NFT to sell below.</Text>
            {!selectedNft ? (
                <>
                    <NFTGrid
                        data={data}
                        isLoading={isLoading}
                        overrideOnclickBehavior={(nft) => {
                            setSelectedNft(nft);
                        }}
                        emptyText={
                            "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
                        }
                    />
                </>
            ) : (
                <Flex justifyContent={"center"} my={10}>
                    <Card w={"75%"}>
                        <SimpleGrid columns={2} spacing={10} p={5}>
                            <ThirdwebNftMedia
                                metadata={selectedNft.metadata}
                                width="100%"
                                height="100%"
                            />
                        </SimpleGrid>
                        <Stack>
                            <Flex justifyContent={"right"}>
                                <Button onClick={() => { setSelectedNft(undefined) }}>X</Button>
                            </Flex>
                            <Heading>{selectedNft.metadata.name}</Heading>
                            <SaleInfo nft={selectedNft}></SaleInfo>

                        </Stack>
                    </Card>
                </Flex>
            )}
        </Container>
    );
}