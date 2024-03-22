import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Text, Card, CardBody, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import axios from 'axios';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const correctNumber = location.state.numberOfCorrect;
  const incorrectNumber = location.state.numberOfIncorrect;
  const sumNumber = correctNumber + incorrectNumber;

  const buttonHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    const userData = {
      id: 3,
      nickname: location.state.nickname,
      score: Math.floor((correctNumber / sumNumber) * 100),
      time: location.state.timeTaken,
    };

    const postData = async () => {
      try {
        await axios.post('http://localhost:8000/api/user', userData);
        console.log('user data posted: ', userData);
      } catch (error) {
        console.error(error);
      }
    };
    postData();
  }, []);

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
              <Button
                mt="3rem"
                colorScheme="purple"
                width="10rem"
                onClick={buttonHandler}
              >
                다시 풀기
              </Button>
              <Link to="/rank">
                <Button>랭킹 보기</Button>
              </Link>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Result;
