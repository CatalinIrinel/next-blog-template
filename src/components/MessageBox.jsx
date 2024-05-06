'use client';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';

function MessageBox(props) {
  return (
    <Box w="full" h={'50px'}>
      {' '}
      <Alert status={props.status || 'info'}>
        <AlertIcon />
        {props.children}
      </Alert>
    </Box>
  );
}
export default MessageBox;
