
# Blockmart NFT Marketplace

Beta version of NFT Marketplace on the CHZ network built using thirdweb

## Configuration Process

Follow these steps to properly configure your environment for the application.

### Step 2: Environment Variables

Fill the `addresses.ts` file located in the `const` folder with the necessary environment variables. These are crucial to linking the app to your custom resources on Thirdweb. Below is a list of required variables:

- `NFT_COLLECTION_ADDRESS` : You can find this key from the api key in NFT collections from contracts on thirdweb.

- `MARKETPLACE_ADDRESS` : You can find this key from the api key in Marketplace-v3 from contracts on thirdweb.

### Step 3: Dependency Installation

Execute the following command in your terminal to install the project dependencies:

```sh
npm install
```

### Step 4: Launching the Development Server

To start the development server, run:

```sh
npm run dev
```
