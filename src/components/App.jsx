import { Box } from "components/utils/Box";
import test from 'components/utils/test.json'
import Btn from 'components/Btn/Btn'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


export const App = () => {
  console.log(test)
  return (
    <>
      <Box
      display="flex"
      justifyContent="space-between"
      >
        <Btn><IoIosArrowBack size={70} /></Btn>
        <Box width ="800px" height ="800px"></Box>
      <Btn><IoIosArrowForward size={70}/></Btn>
      </Box>
    </>
  );
};
