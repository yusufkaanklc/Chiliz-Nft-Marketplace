import { NFT as NFTType } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
    useContract,
    useCreateAuctionListing,
    useCreateDirectListing,
    Web3Button,
} from "@thirdweb-dev/react";
import {
    MARKETPLACE_ADDRESS,
    NFT_COLLECTION_ADDRESS,
} from "../const/addresses";
import { Box, Input, Stack, Text } from "@chakra-ui/react"

type Props = {
    nft: NFTType;
};

type DirectFormData = {
    nftContractAddress: string;
    tokenId: string;
    price: string;
    startDate: Date;
    endDate: Date;
};

export default function SaleInfo({ nft }: Props) {
    const router = useRouter();
    // Connect to marketplace contract
    const { contract: marketplace } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );

    const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

    const { mutateAsync: createDirectListing } =
        useCreateDirectListing(marketplace);

    async function checkAndProvideApproval() {
        // Check if approval is required
        const hasApproval = await nftCollection?.call("isApprovedForAll", [
            nft.owner,
            MARKETPLACE_ADDRESS,
        ]);

        // If it is, provide approval
        if (!hasApproval) {
            const txResult = await nftCollection?.call("setApprovalForAll", [
                MARKETPLACE_ADDRESS,
                true,
            ]);

            if (txResult) {
                console.log("Approval provided")
            }
        }
        return true;
    }

    const { register: registerDirect, handleSubmit: handleSubmitDirect } =
        useForm<DirectFormData>({
            defaultValues: {
                nftContractAddress: NFT_COLLECTION_ADDRESS,
                tokenId: nft.metadata.id,
                startDate: new Date(),
                endDate: new Date(),
                price: "0",
            },
        });

    async function handleSubmissionDirect(data: DirectFormData) {
        await checkAndProvideApproval();
        const txResult = await createDirectListing({
            assetContractAddress: data.nftContractAddress,
            tokenId: data.tokenId,
            pricePerToken: data.price,
            startTimestamp: new Date(data.startDate),
            endTimestamp: new Date(data.endDate),
        });

        return txResult;
    }
    return (
        <Stack spacing={8}>
            <Box>
                <Text fontWeight={"bold"} mb={2}>Direct Listing:</Text>
                <Text>Listing starts on:</Text>
                <Input
                    placeholder="Select Date And Time"
                    size={"md"}
                    type="datetime-local"
                    {...registerDirect("startDate")}
                />
                <Text mt={2}>Listing ends on:</Text>
                <Input
                    placeholder="Select Date And Time"
                    size={"md"}
                    type="datetime-local"
                    {...registerDirect("endDate")}
                />
            </Box>
            <Box>
                <Text fontWeight={"bold"}>Price:</Text>
                <Input
                    placeholder="0"
                    size={"md"}
                    type="number"
                    {...registerDirect("price")}
                />
            </Box>
            <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={async () => {
                    await handleSubmitDirect(handleSubmissionDirect)();
                }}
                onSuccess={(txResult) => {
                    router.push(
                        `/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`
                    );
                }}
            >
                Create Direct Listing
            </Web3Button>
        </Stack>
    )
}