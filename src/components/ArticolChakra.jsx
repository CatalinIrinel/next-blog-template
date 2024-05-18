'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  chakra,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Tooltip,
  Divider,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { FaEye, FaExclamationTriangle } from 'react-icons/fa';
import { GrUpdate, GrUpload } from 'react-icons/gr';
import { GiFeather } from 'react-icons/gi';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import axios from 'axios';
import Parser from 'html-react-parser';

const api =
  process.env.NODE_ENV === 'production'
    ? 'https://api.voxpress.ro'
    : 'http://localhost:5000';

const increaseViews = async (articol) => {
  try {
    await axios.put(`${api}/api/articol/ziare/views-five/${articol._id}`, {
      views: articol.views,
    });
  } catch (error) {
    console.log('Error: ' + error);
  }
};
const ArticolChakra = ({ articol }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUrl =
    articol &&
    `${process.env.NEXT_PUBLIC_LINK}/${articol.categorie}/${articol.slug}`;
  // report articol area
  const [motivReport, setMotivReport] = useState('');
  const [categorieReport, setCategorieReport] = useState('');

  const categorii = [
    {
      text: 'Nuditate',
      value: 'nuditate',
    },
    {
      text: 'Fake News',
      value: 'fakeNews',
    },
    {
      text: 'Dezinformare',
      value: 'dezinformare',
    },
    {
      text: 'Denigrare',
      value: 'denigrare',
    },
    {
      text: 'Altele',
      value: 'altele',
    },
  ];

  useEffect(() => {
    increaseViews(articol);
  }, [articol]);

  const sendReportHandler = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/api/reports/send-report`, {
      motivul: motivReport,
      categorie: categorieReport,
      articolID: articol._id,
    });
  };

  // end of report articol
  return (
    <>
      <Stack w={'full'} maxW={{ base: 'full', lg: '80rem' }}>
        <Stack alignItems={'center'}>
          <Image
            w={'full'}
            h={{ base: '300px', lg: '500px' }}
            objectFit={'contain'}
            src={articol && articol.pozaCoperta[0].src}
            alt={articol && articol.descriereCoperta}
          />
          <Text color={'gray'}>{articol.descriereCoperta}</Text>
        </Stack>
        <Stack w={'full'} px={{ base: '1rem', lg: 0 }} pb={'2rem'}>
          <HStack
            w={'full'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            alignItems={{ base: 'flex-start', lg: 'center' }}
          >
            <HStack
              className="signika-medium"
              flexDir={{ base: 'column', lg: 'row' }}
              alignItems={'flex-start'}
              divider={
                <Divider
                  display={{ base: 'none', lg: 'inherit' }}
                  orientation="vertical"
                  borderColor={'main'}
                  borderLeft={'2px solid !important'}
                />
              }
              gap={'1rem'}
              h={{ base: 'fit-content', lg: '25px' }}
            >
              <Tooltip label={'Autorul'}>
                <HStack>
                  <GiFeather />
                  <Text> {articol && articol.redactor}</Text>
                </HStack>
              </Tooltip>
              <Tooltip label={'Data publicării'}>
                <HStack>
                  <GrUpload />
                  <Text> {articol && articol.dataPostare}</Text>
                </HStack>
              </Tooltip>
              <Tooltip label={'Data actualizării'}>
                <HStack>
                  <GrUpdate />
                  <Text>{articol && articol.dataActualizare}</Text>
                </HStack>
              </Tooltip>
              <Tooltip label={'Număr vizualizări'}>
                <HStack>
                  <FaEye />
                  <Text fontWeight={'bold'}>{articol && articol.views}</Text>
                </HStack>
              </Tooltip>
            </HStack>
            <HStack flexWrap={'wrap'} flexDir={{ base: 'column', lg: 'row' }}>
              <Tooltip label={'Share facebook'}>
                <FacebookShareButton className="shareButton" url={currentUrl}>
                  <FacebookIcon size={48} />
                </FacebookShareButton>
              </Tooltip>
              <Tooltip label={'Share Whatsapp'}>
                <WhatsappShareButton className="shareButton" url={currentUrl}>
                  <WhatsappIcon size={48} />
                </WhatsappShareButton>
              </Tooltip>
              <Tooltip label={'Report articol'}>
                <Button
                  color={'red.500'}
                  bg={'none'}
                  _hover={'none'}
                  _active={'none'}
                  onClick={onOpen}
                  leftIcon={<FaExclamationTriangle />}
                  className="signika-medium"
                >
                  Raportează
                </Button>
              </Tooltip>
            </HStack>
          </HStack>
          <StackDivider />
          <Heading as={'h1'} mb={'2rem'} className="signika-bold">
            {articol && articol.titlu}
          </Heading>
          <div className="signika-regular articolTextArea">
            {articol &&
              articol.continut.map((item) => Parser(item.data.text + '\n\n'))}
          </div>
          {articol.sursaCoperta && (
            <Text>Sursa imagine: {articol.sursaCoperta}</Text>
          )}
        </Stack>
        <HStack
          w={'full'}
          alignItems={'center'}
          justifyContent={'center'}
          px={'2rem'}
          gap={'1rem'}
        >
          {articol.pozeArticol.length > 0 &&
            articol.pozeArticol.map((item, index) => (
              <Card key={index} w={'full'} maxW={'37rem'}>
                <Image
                  maxW={'35rem'}
                  src={item.src}
                  alt={item.descriereImagine}
                />
                <CardBody>
                  <Text color={'gray'}>{item.descriereImagine}</Text>
                </CardBody>
              </Card>
            ))}
        </HStack>
      </Stack>
      {/* modal area */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'contrast'} color={'text'}>
          <ModalHeader>Raportează articolul</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={sendReportHandler}>
              <Stack>
                <FormControl>
                  <FormLabel isRequired>Motivul:</FormLabel>
                  <Textarea
                    onChange={(e) => setMotivReport(e.target.value)}
                    borderColor={'main'}
                    type={'text'}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Categorie:</FormLabel>
                  <Select
                    w={'full'}
                    borderColor={'main'}
                    placeholder="Alege categoria"
                    onChange={(e) => setCategorieReport(e.target.value)}
                  >
                    {categorii.map((item, index) => (
                      <chakra.option
                        color={'text'}
                        key={index}
                        value={item.value}
                      >
                        {item.text}
                      </chakra.option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <Button type="submit" bg={'main'} color={'titleDark'} mr={3}>
                    Trimite report
                  </Button>
                  <Button color={'text'} variant="ghost" onClick={onClose}>
                    Renunță
                  </Button>
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ArticolChakra;
