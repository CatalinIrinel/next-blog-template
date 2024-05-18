'use client';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { FaCircleDot, FaEye } from 'react-icons/fa6';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Parser from 'html-react-parser';
import { Link } from '@chakra-ui/next-js';

const CardArea = ({ category, articole }) => {
  const [categorie, setCategorie] = useState([]);
  useEffect(() => {
    articole.length > 0 &&
      setCategorie(
        articole.filter((articol) =>
          articol.categorie === category ? articol : null
        )
      );
  }, [articole, category]);
  const mainArticle = categorie.length > 0 ? categorie.slice(0, 1) : [];

  return (
    <Stack
      w={'full'}
      minH={'62.5rem'}
      px={{ base: '1rem', lg: '3rem' }}
      py={{ base: '1rem', lg: '2rem' }}
      maxW={{ base: 'full', lg: '80rem' }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'1rem'}
    >
      <>
        <Heading
          textTransform={'capitalize'}
          w={'full'}
          textAlign={'center'}
          as={'h2'}
          fontSize={'2.5rem'}
        >
          {category.split('-').join(' ')}
        </Heading>
        {categorie !== null ? (
          <>
            {' '}
            {mainArticle.map((item) => (
              <Card
                key={item.titlu}
                className="card"
                w={{ base: '350px', lg: 'full' }}
                overflow="hidden"
                bg={'none'}
                boxShadow={'none'}
                border={'none'}
              >
                <Link href={`/${item.categorie}/${item.slug}`}>
                  <CardHeader overflow={'hidden'}>
                    <Image
                      loading="lazy"
                      objectFit={{ base: 'cover', lg: 'contain' }}
                      w={'full'}
                      h={{ base: '200px', lg: '400px' }}
                      borderRadius="lg"
                      src={item.pozaCoperta[0].src}
                      alt={item.descriereCoperta}
                      transition={'all .5s ease-in-out'}
                    />
                  </CardHeader>
                  <CardBody>
                    <HStack
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                      color={'text'}
                      fontWeight={'bold'}
                    >
                      <Text textTransform={'capitalize'}>{item.redactor}</Text>
                      <FaCircleDot fontSize={'.5rem'} />
                      <Text>{item.dataPostare}</Text>
                      <Tooltip label={'Număr vizualizări'}>
                        <HStack>
                          <FaEye />
                          <Text fontWeight={'bold'}>{item.views}</Text>
                        </HStack>
                      </Tooltip>
                    </HStack>
                    <Heading
                      color={'title'}
                      as={'h3'}
                      fontSize={{ base: '1rem', lg: '2rem' }}
                      className="signika-bold"
                    >
                      {item.titlu}
                    </Heading>
                    <Text
                      w={{ base: '300px', lg: '200ch' }}
                      overflow={'hidden'}
                      textOverflow={'ellipsis'}
                      whiteSpace={'nowrap'}
                      className="signika-regular"
                    >
                      {Parser(item.continut[0].data.text + '\n\n')}
                    </Text>
                  </CardBody>
                  <CardFooter gap={'2rem'}>
                    <Badge
                      p={'.125rem .4rem'}
                      borderRadius={'md'}
                      variant={'subtle'}
                      colorScheme={'red'}
                    >
                      {item.categorie}
                    </Badge>
                  </CardFooter>{' '}
                </Link>
              </Card>
            ))}
            <HStack
              gap={'2rem'}
              w={'full'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
            >
              {categorie.slice(1, 4).map((articol) => (
                <Link
                  key={articol._id}
                  href={`/${articol.categorie}/${articol.slug}`}
                >
                  <Card
                    maxW="350px"
                    bg={'none'}
                    boxShadow={'none'}
                    border={'none'}
                  >
                    <CardBody>
                      <Image
                        w={'full'}
                        h={'200px'}
                        objectFit={'cover'}
                        src={articol.pozaCoperta[0].src}
                        alt={articol.descriereCoperta}
                        borderRadius="lg"
                      />
                      <Stack mt="6" spacing="3">
                        <Heading
                          className="signika-bold"
                          as={'h3'}
                          color={'title'}
                          fontSize={{ base: '1rem', lg: '1.5rem' }}
                        >
                          {articol.titlu.slice(0, 111) + '...'}
                        </Heading>
                        <Text
                          className="signika-regular"
                          w={'300px'}
                          overflow={'hidden'}
                          textOverflow={'ellipsis'}
                          whiteSpace={'nowrap'}
                        >
                          {Parser(articol.continut[0].data.text + '\n\n')}
                        </Text>
                      </Stack>
                    </CardBody>
                    <CardFooter justifyContent={'space-between'}>
                      <Badge
                        p={'.125rem .4rem'}
                        borderRadius={'md'}
                        variant={'subtle'}
                        colorScheme={'purple'}
                      >
                        {articol.categorie}
                      </Badge>{' '}
                      <Text>{articol.dataPostare}</Text>
                      <Tooltip label={'Număr vizualizări'}>
                        <HStack>
                          <FaEye />
                          <Text fontWeight={'bold'}>{articol.views}</Text>
                        </HStack>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </HStack>
          </>
        ) : (
          <MessageBox status="info">
            Momentan nu sunt articole în această categorie :(
          </MessageBox>
        )}
      </>
    </Stack>
  );
};

export default CardArea;
