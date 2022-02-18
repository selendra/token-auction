import { checkAddress } from '@polkadot/util-crypto';

export const isvalidSubstrateAddress = (address) => {
  const check = checkAddress(address, 42);
  const check2 = checkAddress(address, 972);

  if (check[0] || check2[0]) {
    return true;
  } else {
    return false;
  }
}