import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Flex, Stack, Skeleton, Box, Button, Card, Text, CardBody, Spacer, HStack } from "@chakra-ui/react";

const Quiz = () => {
  const navigate = useNavigate();
  const [backendData, setBackendData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("init");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [endTime, setEndTime] = useState(null);

  const location = useLocation();
  const startTime = location.state.startTime;

  const fetchData = async () => {
    setFetchStatus("loading");
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=4&category=18&type=multiple"
      );
      const data = await response.json();
      const newData = data.results.map((question) => {
        const answer = question.correct_answer;
        const random = [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: answer,
          options: random,
        };
      });
      setBackendData(newData);
      setFetchStatus("loaded");
    } catch (error) {
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextQuestion = () => {
    if (userAnswer.length === currentQuestionIndex + 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("문항을 선택해주세요");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      if (event.target.value === backendData[currentQuestionIndex].answer) {
        setUserAnswer([
          ...userAnswer,
          {
            question: backendData[currentQuestionIndex].question,
            answer: event.target.value,
            isCorrect: true,
          },
        ]);
      } else {
        setUserAnswer([
          ...userAnswer,
          {
            question: backendData[currentQuestionIndex].question,
            answer: event.target.value,
            isCorrect: false,
          },
        ]);
      }
    }
  };

  const handleSubmitAnswers = () => {
    const numberOfCorrect = userAnswer.filter(
      (answer) => answer.isCorrect === true
    ).length;
    const numberOfIncorrect = backendData.length - numberOfCorrect;
    const endTime = new Date().getTime();
    setEndTime(endTime);
    const timeTaken = (endTime - startTime) / 1000;
    navigate("/result", {
      state: {
        numberOfCorrect: numberOfCorrect,
        numberOfIncorrect: numberOfIncorrect,
        timeTaken: timeTaken,
        nickname: location.state.nickname,
      },
    });
  };

  if (fetchStatus === "loading" || fetchStatus === "init") {
    return (
      <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center" p="1%">
        <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']} variant="filled" bg="#faf2ff">
          <CardBody>
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    );
  } else if (fetchStatus === "loaded") {
    const currentQuestion = backendData[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === backendData.length - 1;
    const option = currentQuestion.options.map((option, index) => (
      <div key={`${currentQuestionIndex}-${index}`}>
        <input
          onChange={handleChange}
          type="radio"
          name="option.question"
          value={option}
          disabled={userAnswer.length !== currentQuestionIndex}
          style={{ margin: "2%", width: "1.1rem", height: "1.1rem", verticalAlign: "middle"}}
        />
        {index+1}.&nbsp;&nbsp;
        <label
          fontSize={{ base: '1rem', md: '1.1rem', lg: '1.2rem' }}
          dangerouslySetInnerHTML={{ __html: option }}
        />
      </div>
    ));

    let message = "";
    if (userAnswer.length === currentQuestionIndex) {
      message = "";
    } else if (userAnswer[currentQuestionIndex].isCorrect) {
      message = "정답입니다🥳";
    } else {
      message = "오답입니다😥";
    }
    
    const answerNumber =  backendData[currentQuestionIndex].options.indexOf(backendData[currentQuestionIndex].answer) + 1;

    return (
      <>
        <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center" p="1%">
          <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']} variant="filled" bg="#faf2ff">
            <CardBody>
              <Flex flexDirection="column" h="100%">
                <form onSubmit={handleSubmit}>
                  <Box color="#560094" display="block" as="b" fontSize={{ base: '17px', md: '20px', lg: '25px' }}>[{currentQuestionIndex+1}/{backendData.length}]</Box>
                  <Box color="#7a00d1" h="6rem"  as="b" fontSize={{ base: '15px', md: '17px', lg: '20px' }} dangerouslySetInnerHTML={{ __html: currentQuestion.question}}/>
                  <Box color="#00000" h="15rem" as="b" fontSize={{ base: '13px', md: '15px', lg: '17px' }} >
                    {option}
                  </Box>
                  <Spacer></Spacer>
                  <Flex mt="2%">
                      <Button mb='1%' fontWeight="medium" fontSize="1rem" colorScheme={userAnswer[currentQuestionIndex] ? (userAnswer[currentQuestionIndex].isCorrect ? 'green' : 'red') : 'transparent'} variant="solid" w="100%">
                        {message} {userAnswer.length === currentQuestionIndex + 1 && !userAnswer[currentQuestionIndex].isCorrect && 
                        <Text fontSize='1rem'>&nbsp;&nbsp;(정답: {answerNumber}번)</Text>}
                      </Button>
                      </Flex>
                      
                      <Flex>
                        {isLastQuestion ? (
                          <>
                            {userAnswer.length === backendData.length && (
                              <Button 
                                fontWeight="bold" fontSize="1rem" w="100%" colorScheme="messenger" variant="solid" 
                                onClick={handleSubmitAnswers}
                              >
                                결과 보러 가기
                              </Button>
                            )}
                          </>
                        ) : (
                          <Box w="100%">
                            <Button 
                              fontWeight="medium" fontSize="1rem" colorScheme="purple" variant="solid" w="100%" 
                              type="submit" 
                              onClick={handleNextQuestion}
                            >
                              다음 문제로
                            </Button>
                          </Box>
                        )}
                      </Flex>
                </form>
              </Flex>
              
            </CardBody>
          </Card>
        </Flex>
      </>
    );
  }
};

export default Quiz;
