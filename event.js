const Web3 = require('web3');
const notifier = require('node-notifier');

// ANSI escape codes
const ANSI_RED = '\x1b[31m';    
const ANSI_RESET = '\x1b[0m';  

async function checkForNewContracts() {
  const web3 = new Web3('wss://mainnet.infura.io/ws/v3/YOUR_API_KEY'); // CHANGE YOUR WEBSOCKETS

  const subscription = web3.eth.subscribe('newBlockHeaders')
    .on('data', async (blockHeader) => {
      const block = await web3.eth.getBlock(blockHeader.number, true);
      if (block && block.transactions) {
        const formattedData = block.transactions
          .filter(transaction => transaction.to === null)
          .map(transaction => {
            const { blockNumber, from, hash, value, gas, gasPrice, creates } = transaction;
            const contractAddress = creates || 'N/A';

            return {
              [`${ANSI_RED}Block #${ANSI_RESET}`]: blockNumber,
              [`${ANSI_RED}From${ANSI_RESET}`]: from,
              [`${ANSI_RED}Hash${ANSI_RESET}`]: hash,
              [`${ANSI_RED}Value${ANSI_RESET}`]: value,
              [`${ANSI_RED}Gas${ANSI_RESET}`]: gas,
              [`${ANSI_RED}Gas Price${ANSI_RESET}`]: gasPrice,
              [`${ANSI_RED}Contract Address${ANSI_RESET}`]: contractAddress,
            };
          });

        // Remove 'index' property from each object
        formattedData.forEach(data => {
          delete data.index;
        });

        console.table(formattedData);

        formattedData.forEach(data => {
          const message = `New contract creation event - Block #${data[`${ANSI_RED}Block #${ANSI_RESET}`]}:\n
            - From: ${data[`${ANSI_RED}From${ANSI_RESET}`]}\n
            - Hash: ${data[`${ANSI_RED}Hash${ANSI_RESET}`]}\n
            - Value: ${data[`${ANSI_RED}Value${ANSI_RESET}`]}\n
            - Gas: ${data[`${ANSI_RED}Gas${ANSI_RESET}`]}\n
            - Gas Price: ${data[`${ANSI_RED}Gas Price${ANSI_RESET}`]}\n
            - Contract Address: ${data[`${ANSI_RED}Contract Address${ANSI_RESET}`]}\n`;

          notifier.notify({
            title: 'New event',
            message,
            sound: false, // Turn on/off sound (true/false)
          });
        });
      }
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });

  return subscription;
}

checkForNewContracts()
  .then((subscription) => {
    console.log('Start listening for new contract creation events...');
  })
  .catch((error) => {
    console.error('Error when starting event listener:', error);
  });
