import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Flex, Text, Box, Button, Input, Card, CardBody } from '@chakra-ui/react'

const Home = () => {
  const [nickname, setNickname] = useState(''); 
  const [isNicknameValid, setIsNicknameValid] = useState(false); 
  const [startTime, setStartTime] = useState(null);

  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    validateNickname(event.target.value);
  }

  const validateNickname = (nickname) => {
    if (nickname.trim().length > 0) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  }

  const handleStartButtonClick = event => {
    event.preventDefault();
    const startTime = new Date().getTime();
    setStartTime(startTime);
    navigate('/quiz', {state: {startTime: startTime, nickname: nickname}});
  }

  return (
    <Flex w='calc(100wh)' h='calc(100vh)' alignItems="center" justifyContent="center">
    <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']}  variant='filled' bg='#faf2ff'>
      <CardBody>
        <Flex  alignItems="center" justifyContent="center" flexDirection="column" h='100%'>
            <Text color='#6c23a1' fontSize={{ base: '25px', md: '35px', lg: '45px' }}>🔮 오늘의 퀴즈 🔮</Text>
            <Box pt="5%" w="100%">
              <form onSubmit={handleStartButtonClick}>
                <Flex flexDirection="row" alignItems="center" justifyContent="center" w="100%">
                  <Input 
                    color='#6c23a1' w='60%' variant='ghost' type="text" mr="10%" fontSize={{ base: '13px', md: '15px', lg: '17px' }}
                    value={nickname} 
                    onChange={handleNicknameChange} 
                    placeholder="닉네임을 입력해주세요" 
                  />
                  <Button 
                    fontWeight='medium' fontSize={{ base: '13px', md: '15px', lg: '17px' }} colorScheme='purple' variant='solid' w='20%' 
                    type="submit" 
                    isDisabled={!isNicknameValid} 
                  >
                    퀴즈 풀기
                  </Button>
                </Flex>
              </form>
            </Box>
        </Flex>
      </CardBody>
    </Card>
    </Flex>
    
  );
};

export default Home;