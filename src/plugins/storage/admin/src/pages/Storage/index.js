// admin/src/pages/Homepage/index.js
/*
 *
 * HomePage
 *
 */

import { storageListRequet } from '../../api/storage.js';
import React, { memo, useState, useEffect } from 'react';
import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Flex,
  Typography,
  Checkbox,
  VisuallyHidden,
  Avatar,
  IconButton,
  EmptyStateLayout,
  BaseHeaderLayout,
  ContentLayout
} from '@strapi/design-system';
import { Stack, Pencil, Trash} from '@strapi/icons'
const Storage = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    storageListRequet.getList()
    .then(res => {
      setTaskCount(res);
    })
    .catch(e => {
      console.log(e);
    });
  }, [setTaskCount]);

  const entry = {
    cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    description: 'Chez Léon is a human sized Parisian',
    category: 'French cuisine',
    contact: 'Leon Lafrite',
    fallback: 'LL'
  };
  const entries = [];
  for (let i = 0; i < 50; i++) {
    entries.push({
      ...entry,
      id: i + 1
    });
  }

  return (
    <>   
        {taskCount === 0 && (
            <EmptyStateLayout icon={<Stack />} content="На данный момент склад пуст" />
        )}
        {taskCount > 0 && (
            <>
                <BaseHeaderLayout
                    title="Storage plugin"
                    subtitle="Это ваш склад, управлять им так же легко как нажать большую красную кнопку."
                    as="h2"
                />
                <ContentLayout>
                    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
                        <Thead>
                        <Tr>
                            <Th>
                            <Checkbox aria-label="Select all entries" />
                            </Th>
                            <Th>
                            <Typography variant="sigma">ID</Typography>
                            </Th>
                            <Th>
                            <Typography variant="sigma">Cover</Typography>
                            </Th>
                            <Th>
                            <Typography variant="sigma">Description</Typography>
                            </Th>
                            <Th>
                            <Typography variant="sigma">Categories</Typography>
                            </Th>
                            <Th>
                            <Typography variant="sigma">Contact</Typography>
                            </Th>
                            <Th>
                            <VisuallyHidden>Actions</VisuallyHidden>
                            </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {entries.map(entry => <Tr key={entry.id}>
                            <Td>
                                <Checkbox aria-label={`Select ${entry.contact}`} />
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.id}</Typography>
                            </Td>
                            <Td>
                                <Avatar src={entry.cover} alt={entry.contact} fallback={entry.fallback} />
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.description}</Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.category}</Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.contact}</Typography>
                            </Td>
                            <Td>
                                <Flex>
                                <IconButton onClick={() => console.log('edit')} label="Edit" borderWidth={0}>
                                    <Pencil />
                                </IconButton>
                                <Box paddingLeft={1}>
                                    <IconButton onClick={() => console.log('delete')} label="Delete" borderWidth={0}>
                                    <Trash />
                                    </IconButton>
                                </Box>
                                </Flex>
                            </Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </ContentLayout>
            </>
        )}
    </>
            
  );
};

export default memo(Storage);