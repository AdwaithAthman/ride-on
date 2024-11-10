import RideLayout from '@/components/rideLayout';
import { useLocationStore } from '@/store'
import { View, Text } from 'react-native'

const FindRide = () => {
  const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore();
  return (
    <RideLayout>
      <Text className=''>FindRide</Text>
    </RideLayout>
  )
}

export default FindRide