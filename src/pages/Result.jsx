import { useLocation } from 'react-router-dom';
import { Flex, Text, Card, CardBody } from '@chakra-ui/react';

const Result = () => {
  const location = useLocation();
  const correctNumber = location.state.numberOfCorrect;
  const incorrectNumber = location.state.numberOfIncorrect;
  const sumNumber = correctNumber + incorrectNumber;

  return (
    <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center">
      <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']}  variant="filled" bg="#faf2ff">
        <CardBody>
          <Flex alignItems="center" justifyContent="center" flexDirection="column" h="100%">
            <Text color="#6c23a1" fontSize={{ base: '25px', md: '35px', lg: '45px' }}>
              🎉 <b>{location.state.nickname}님</b>의 결과는? <b>{Math.floor((correctNumber / sumNumber) * 100)}점!!</b> 🎉
            </Text>
            <Flex alignItems="center" justifyContent="center" flexDirection="column" mt="4rem">
              <Text fontSize="1.3rem">
                정답: ({correctNumber}/{sumNumber})개
              </Text>
              <Text fontSize="1.3rem" mt="1rem">
                오답: ({incorrectNumber}/{sumNumber})개
              </Text>
              <Text fontSize="1.3rem" mt="1rem">
                시간: {location.state.timeTaken}초
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Result;
