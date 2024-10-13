import {
    isConnected,
    requestAccess,
    signAuthEntry,
    signTransaction,
    signBlob,
  } from "@stellar/freighter-api";
  
  
  export const retrievePublicKey = async () => {
    console.log("retrieving public key");
    const isAppConnected = await isConnected();
    
    // if ("isConnected" in isAppConnected && isAppConnected.isConnected) {
    //   alert("User has Freighter!");
    // }

    const accessObj = await requestAccess();
  
    if (accessObj.error) {
      return accessObj.error;
    } else {
      return accessObj.address;
    }
  };
  
//   const result = retrievePublicKey();

// import { getAddress } from "@stellar/freighter-api";

// export const retrievePublicKey = async () => {
//   console.log("retrieving public key");
//   const addressObj = await getAddress();
//   console.log(addressObj.address);

//   if (addressObj.error) {
//     return addressObj.error;
//   } else {
//     return addressObj.address;
//   }
// };

// // const result = retrievePublicKey();