import NetInfo from "@react-native-community/netinfo";

const checknetwork = async () => {
  const netState = await NetInfo.fetch();
  return netState.isConnected;
};
export default checknetwork;
