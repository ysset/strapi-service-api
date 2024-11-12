// admin/src/pages/Homepage/index.js
/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';

import { storageListRequet } from '../../api/storage.js';
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
  EmptyStateLayout, 
  BaseHeaderLayout, 
  ContentLayout,
  Checkbox,
  VisuallyHidden,
  Avatar,
  IconButton,
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavLink,
  TextButton,
  SubNavLinkSection,
  SubNavSection,
} from '@strapi/design-system';
import { Stack, Pencil, Trash} from '@strapi/icons'

const HomePage = () => {
  const [taskCount, setTaskCount] = useState(0);
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [search, setSearch] = React.useState('');
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
      id: i
    });
  }

  return (
    <div style={{
      overflow: 'hidden',
      height: '100vh',
    }}>
        <div style={{
          display: 'flex',
          height: '100%',
        }}>
          <div style={{
            padding: '1rem',
          }}>
            <SubNav aria-label="Settings sub nav">
              <SubNavHeader label="Settings" />
              <SubNavSections>
              </SubNavSections>
            </SubNav>
          </div>
          <div style={{
            overflowY: 'auto',
            width: '100%'
          }}>
            <div style={{
              marginLeft: '3vh',
              marginRight: '3vh'
            }}>
              <BaseHeaderLayout
                  title="Storage plugin"
                  subtitle="Это ваш склад, управлять им так же легко как нажать большую красную кнопку."
                  as="h2"
                />
                {taskCount === 0 && (
                  <EmptyStateLayout icon={<Stack />} content="На данный момент склад пуст" />
                )}
                {taskCount > 0 && (
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
                )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default memo(HomePage);