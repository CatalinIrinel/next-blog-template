'use client';

import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { FaEye } from 'react-icons/fa6';
import Parser from 'html-react-parser';
import { Link } from '@chakra-ui/next-js';

const ArticleCard = ({ articol }) => {
  return (
    <Stack>
      <Link href={`/${articol.categorie}/${articol.slug}?id=${articol._id}`}>
        <Card maxW="350px" bg={'none'} boxShadow={'none'} border={'none'}>
          <CardBody>
            <Image
              w={'full'}
              h={'200px'}
              loading="lazy"
              objectFit={'cover'}
              src={articol.pozaCoperta[0].src}
              alt={articol.descriereCoperta}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading
                as={'h3'}
                size="md"
                w={'300px'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
                whiteSpace={'nowrap'}
                className="signika-bold"
              >
                {articol.titlu}
              </Heading>
              <Text
                className="signika-regular"
                w={'300px'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
                whiteSpace={'nowrap'}
              >
                {articol.continut.map((item) =>
                  Parser(item.data.text + '\n\n')
                )}
              </Text>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'space-between'}>
            <Badge
              p={'.125rem .4rem'}
              borderRadius={'md'}
              variant={'subtle'}
              colorScheme={'blue'}
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
    </Stack>
  );
};

export default ArticleCard;
