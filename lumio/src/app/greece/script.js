
const StellarSdk = require('@stellar/stellar-sdk');
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');


export const addCoins = () => {

    async function transferTokens() {
        try {
            // Load the source account
            const sourceKeypair = StellarSdk.Keypair.fromSecret("SCIOUO2KLAEBHQ24LWAYU6XHONAQ5G3XUTEIQ63SDC7KPFADMBYTZWAR");
            const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

            // Create the transaction
            const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
            .addOperation(StellarSdk.Operation.payment({
                destination: "GBLHTSZUVLHUD5BWEMIXQ3O5NMD5FZHUBJTV5HRBTVKHSRIESCKNKHSP",
                asset: StellarSdk.Asset.native(),
                // amount: amount.toString()
                amount: "5094.91"
            }))
            .setTimeout(30)
            .build();

            // Sign and submit the transaction
            transaction.sign(sourceKeypair);
            const result = await server.submitTransaction(transaction);
            console.log('Transfer successful:', result);
            return result;
        } catch (error) {
            console.error('Transfer failed:', error);
            throw error;
        }
    }

    // Example usage:
    transferTokens(
        'SOURCE_SECRET_KEY',
        'DESTINATION_PUBLIC_KEY',
        '100',
        'ASSET_CODE',
        'ASSET_ISSUER_PUBLIC_KEY'
    )
    .then(console.log('Transfer successful'))
    .catch(console.error);

}

export const deployContract = () => {

    async function deployMatrixContract() {
        // Generate a new keypair for the contract
        const contractKeypair = StellarSdk.Keypair.fromSecret("SCIOUO2KLAEBHQ24LWAYU6XHONAQ5G3XUTEIQ63SDC7KPFADMBYTZWAR");

        // Define the 2x2 matrix
        const matrix = [
            [1, 2],
            [3, 4]
        ];

        // Convert the matrix to a string (you might want to use a more robust serialization method)
        const matrixData = JSON.stringify(matrix);

        // Create a new account transaction
        const account = await server.loadAccount(contractKeypair.publicKey());
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
        .addOperation(StellarSdk.Operation.manageData({
            name: 'matrix',
            value: matrixData
        }))
        .setTimeout(30)
        .build();

        // Sign and submit the transaction
        transaction.sign(contractKeypair);
        try {
            const result = await server.submitTransaction(transaction);
            console.log('Contract deployed successfully:', result);
            return result.id;
        } catch (error) {
            console.error('Failed to deploy contract:', error);
            throw error;
        }
    }

    // Call the function
    deployMatrixContract()
        .then(contractID => console.log('Contract ID:', contractID))
        .catch(error => console.error('Deployment failed:', error));
}
