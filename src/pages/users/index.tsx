import { useEffect } from 'react'
import Link from 'next/link'
import { Box, Text, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'
import { useQuery } from 'react-query';

import { SideBar } from '../../components/SideBar'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Spinner } from '@chakra-ui/react';
import { api } from '../../services/api';

export default function UserList() {
  const { data, isLoading, error, isFetched } = useQuery('users', async () => {
    const { data } = await api.get('http://localhost:3000/api/users')    

    const users = data.map(user => {
      return {
        id: user.id,
        name: user.name, 
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })
    return users;
  }, {
    staleTime: 1000 * 5  // 5 seconds
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
       .then(response => response.json())
       .then(data => console.log(data))
  }, [])

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">

            <Heading size="lg" fontWeight="normal">
              Usuários

              { !isLoading && isFetched && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>            

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo    
              </Button>
            </Link>
          </Flex>

         { isLoading ? (
           <Flex justify="center">
             <Spinner />
           </Flex>
         ) : error ? (
            <Flex justify="center">
              <Text>Erro ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
               <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4","4","6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px="6">
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}                
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

               <Pagination />
            </>
         )}

        </Box>
      </Flex>
    </Box>
  )
}
