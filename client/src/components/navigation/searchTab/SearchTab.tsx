import { Flex, Input, useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from '../../../hooks/useReduxHooks'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { userBaseData } from '../../../../types'
import SearchedUser from './SearchedUser'
import NoUsersFound from './NoUsersFound'

const SearchTab = () => {
  const tabsState = useAppSelector((state) => state.tabs)
  const isOpen = tabsState.isOpen && tabsState.type === 'search'
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState<userBaseData[] | null>(null)
  const axiosPrivate = useAxiosPrivate()

  const leftClose = [0, null, '-100%']
  const leftOpen = [0, null, '208px', '224px', '272px', '336px']
  const topClose = ['-100%', null, 0]
  const topOpen = 0

  useEffect(() => {
    const getUsers = async () => {
      const result = await axiosPrivate.get('/protected/user/search', { params: { search: searchValue } })
      if ((result.data as Array<userBaseData>).length === 0) {
        users !== null && setUsers(null)
      } else {
        setUsers(result.data)
      }
    }

    if (searchValue !== '' && isOpen) {
      getUsers()
    }
    if (searchValue === '' && isOpen) {
      setUsers(null)
    }
  }, [searchValue])

  return (
    <Flex
      flexDirection='column'
      background={useColorModeValue('white', 'gray.800')}
      zIndex={5}
      width={['100%', null, '456px']}
      pt={[16, null, 14]}
      pb={14}
      px={7}
      position='fixed'
      left={isOpen ? leftOpen : leftClose}
      top={isOpen ? topOpen : topClose}
      height='100vh'
      boxShadow={useColorModeValue('2xl', 'dark-lg')}
      gap={4}
    >
      <Input placeholder='Search for user' value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} />
      <Flex flexDirection='column' gap={2}>
        {users !== null && users.map((u) => <SearchedUser imageUrl={u.imageUrl} username={u.username} key={u.username} />)}
        {users === null && searchValue !== '' && <NoUsersFound />}
      </Flex>
    </Flex>
  )
}

export default SearchTab
