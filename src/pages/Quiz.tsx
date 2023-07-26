import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Flex, Stack, Skeleton, Box, Button, Card, Text, CardBody, Spacer } from "@chakra-ui/react";

const Quiz = () => {
  const navigate = useNavigate();
  // backendData 타입이 never로 떠서 BackendData 타입을 만들고 useState에 타입을 넣어줌
  const [backendData, setBackendData] = useState<BackendData>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("init");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<UserAnswer>([]);
  const [endTime, setEndTime] = useState<EndTime>(null);

  const location: Location = useLocation();
  const startTime = location.state.startTime;

  type Location = {
    state: {
      nickname: string;
      startTime: number;
    },
    pathname: string;
    search: string;
    hash: string;
    key: string;
  }

  type FetchStatus = "init" | "loading" | "loaded" | "error";

  // enum FetchStatus {
  //   init = "init",
  //   loading = "loading",
  //   loaded = "loaded",
  //   error = "error",
  // }

  type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    // incorrect_answers: string[];
  }

  type UserAnswer = {
    question: string;
    answer: string;
    isCorrect: boolean;
  }[];

  type NewQuestion = {
    question: string;
    answer: string;
    isCorrect: boolean;
  };
  
  // backendData가 맨 처음에는 없다가 로딩되면 생김
  // 이렇게 하면 Array 안에 이런 객체들이 4개 들어가도 되는 건가.. 이건 하나만 정의한 거 아닌가..
  type BackendData = {
    question: string;
    answer: string;
    options: Array<string>;
  }[];

  type EndTime = number | null;

  const url: string = "https://opentdb.com/api.php?amount=4&category=18&type=multiple" 
  
  const fetchData = async () => {
    setFetchStatus("loading");
    try {
      const response = await fetch(url);
      console.log('response: ', response)
      // type=뒷부분은 잘못돼도 response.ok가 true로 나옴
      // if (!response.ok) {
      //   console.log("잘못된 URL입니다")
      //   throw new Error("잘못된 URL입니다.");
      // }
      
      const data = await response.json();
      const newData = data.results.map((question: Question) => {
        console.log("question", question);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  
  
  // console.log('bakendData', backendData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newQuestion: NewQuestion = {
        question: backendData[currentQuestionIndex].question,
        answer: event.target.value,
        isCorrect: event.target.value === backendData[currentQuestionIndex].answer,
      };
      
      setUserAnswer([
        ...userAnswer,
        newQuestion,
      ]);
    }
  };

  const handleSubmitAnswers = () => {
    const numberOfCorrect = userAnswer.filter(
      (answer) => answer.isCorrect === true
    ).length;
    
    const numberOfIncorrect = backendData.length - numberOfCorrect;
    const endTime: EndTime = new Date().getTime();

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

  switch (fetchStatus) {
    case "init":
    case "loading":
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
    case "loaded":
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
  case "error":
    return <p>문제 데이터를 받아오지 못했습니다.</p>
  // default:
  //   return <p>무언가 잘못되었습니다.</p> // 얘도 됨
  //   return fetchData // 얘도 됨
  }
}


//     if (fetchStatus === "loading" || fetchStatus === "init") {
//     return (
//       <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center" p="1%">
//         <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']} variant="filled" bg="#faf2ff">
//           <CardBody>
//             <Stack>
//               <Skeleton height="40px" />
//               <Skeleton height="40px" />
//               <Skeleton height="40px" />
//             </Stack>
//           </CardBody>
//         </Card>
//       </Flex>
//     );
//   } else if (fetchStatus === "loaded") {
//     const currentQuestion = backendData[currentQuestionIndex];
//     const isLastQuestion = currentQuestionIndex === backendData.length - 1;
//     const option = currentQuestion.options.map((option, index) => (
//       <div key={`${currentQuestionIndex}-${index}`}>
//         <input
//           onChange={handleChange}
//           type="radio"
//           name="option.question"
//           value={option}
//           disabled={userAnswer.length !== currentQuestionIndex}
//           style={{ margin: "2%", width: "1.1rem", height: "1.1rem", verticalAlign: "middle"}}
//         />
//         {index+1}.&nbsp;&nbsp;
//         <label
//           font-size={{ base: '1rem', md: '1.1rem', lg: '1.2rem' }}
//           dangerouslySetInnerHTML={{ __html: option }}
//         />
//       </div>
//     ));

//     let message = "";
//     if (userAnswer.length === currentQuestionIndex) {
//       message = "";
//     } else if (userAnswer[currentQuestionIndex].isCorrect) {
//       message = "정답입니다🥳";
//     } else {
//       message = "오답입니다😥";
//     }
    
//     const answerNumber =  backendData[currentQuestionIndex].options.indexOf(backendData[currentQuestionIndex].answer) + 1;

//     return (
//       <>
//         <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center" p="1%">
//           <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']} variant="filled" bg="#faf2ff">
//             <CardBody>
//               <Flex flexDirection="column" h="100%">
//                 <form onSubmit={handleSubmit}>
//                   <Box color="#560094" display="block" as="b" fontSize={{ base: '17px', md: '20px', lg: '25px' }}>[{currentQuestionIndex+1}/{backendData.length}]</Box>
//                   <Box color="#7a00d1" h="6rem"  as="b" fontSize={{ base: '15px', md: '17px', lg: '20px' }} dangerouslySetInnerHTML={{ __html: currentQuestion.question}}/>
//                   <Box color="#00000" h="15rem" as="b" fontSize={{ base: '13px', md: '15px', lg: '17px' }} >
//                     {option}
//                   </Box>
//                   <Spacer></Spacer>
//                   <Flex mt="2%">
//                       <Button mb='1%' fontWeight="medium" fontSize="1rem" colorScheme={userAnswer[currentQuestionIndex] ? (userAnswer[currentQuestionIndex].isCorrect ? 'green' : 'red') : 'transparent'} variant="solid" w="100%">
//                         {message} {userAnswer.length === currentQuestionIndex + 1 && !userAnswer[currentQuestionIndex].isCorrect && 
//                         <Text fontSize='1rem'>&nbsp;&nbsp;(정답: {answerNumber}번)</Text>}
//                       </Button>
//                       </Flex>
                      
//                       <Flex>
//                         {isLastQuestion ? (
//                           <>
//                             {userAnswer.length === backendData.length && (
//                               <Button 
//                                 fontWeight="bold" fontSize="1rem" w="100%" colorScheme="messenger" variant="solid" 
//                                 onClick={handleSubmitAnswers}
//                               >
//                                 결과 보러 가기
//                               </Button>
//                             )}
//                           </>
//                         ) : (
//                           <Box w="100%">
//                             <Button 
//                               fontWeight="medium" fontSize="1rem" colorScheme="purple" variant="solid" w="100%" 
//                               type="submit" 
//                               onClick={handleNextQuestion}
//                             >
//                               다음 문제로
//                             </Button>
//                           </Box>
//                         )}
//                       </Flex>
//                 </form>
//               </Flex>
              
//             </CardBody>
//           </Card>
//         </Flex>
//       </>
//     );
//   } else {
//     return <p>문제 데이터를 받아오지 못했습니다.</p>
//   } 
// };

export default Quiz;
