import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Text, Card, CardBody, Button } from '@chakra-ui/react';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const correctNumber = location.state.numberOfCorrect;
  const incorrectNumber = location.state.numberOfIncorrect;
  const sumNumber = correctNumber + incorrectNumber;

  const buttonHandler = () => {
    navigate('/');
  };

  return (
    <Flex
      w="calc(100wh)"
      h="calc(100vh)"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        height={['100%', '80%', '70%', '60%']}
        width={['100%', '80%', '60%', '50%']}
        variant="filled"
        bg="#faf2ff"
      >
        <CardBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="100%"
          >
            <Text
              color="#6c23a1"
              fontSize={{ base: '25px', md: '30px', lg: '40px' }}
            >
              <b>{location.state.nickname}님</b>의 결과는?
            </Text>
            <Text
              color="purple"
              fontSize={{ base: '25px', md: '35px', lg: '45px' }}
            >
              🎉{' '}
              <b>
                {Math.floor((correctNumber / sumNumber) * 100)}
                점!!
              </b>{' '}
              🎉
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              mt="3rem"
            >
              <Text color="#6c23a1" fontSize="1.3rem">
                정답: ({correctNumber}/{sumNumber}
                )개
              </Text>
              <Text color="#6c23a1" fontSize="1.3rem" mt="1rem">
                오답: ({incorrectNumber}/{sumNumber}
                )개
              </Text>
              <Text color="#6c23a1" fontSize="1.3rem" mt="1rem">
                시간: {location.state.timeTaken}초
              </Text>
              <Flex alignItems="center" flexDirection="column" gap={2}>
                <Button
                  mt="2rem"
                  colorScheme="purple"
                  width="10rem"
                  onClick={buttonHandler}
                >
                  다시 풀기
                </Button>
                <Link to="/rank">
                  <Button colorScheme="twitter" width="10rem">
                    랭킹 보기
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Result;
