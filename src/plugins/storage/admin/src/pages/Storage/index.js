// admin/src/pages/Homepage/index.js
/*
 *
 * HomePage
 *
 */

import { storageListRequest } from '../../api/storage.js';
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
  IconButton,
  EmptyStateLayout,
  BaseHeaderLayout,
  ContentLayout,
  Button,
} from '@strapi/design-system';
import { Stack, Pencil, Trash} from '@strapi/icons'
import CustomCheckbox from '../../components/Checkbox'
import LoadFromExcelButton from '../../components/LoadFromExcelButton/index.js';

const Storage = () => {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState(null);
  const [isTableOptions, setIsTableOptions] = useState(false);

  useEffect(() => {
    storageListRequest.getList()
    .then(storage => {
        const localRows = JSON.parse(storage)
        if(localRows) {
            const collums = localRows.shift();
            const local = collums?.map(e => ({
                    name: e,
                    data: [],
                    visible: true,
                }))
            local.forEach((e, i) => {
                localRows.forEach(row => {
                    e.data.push(row[i])
                })
            });
            setData(local)
        }
    })
    .catch(console.log);
  }, []);


  useEffect(() => {
    const local = []
    
    if(data){
        for(let i = 0; i <= data[0].data.length - 1; i++) {
            local.push(data.map(e => {
                return {
                    visible: e.visible,
                    data: e.data[i]
                }
            }))
        }
        
        setRows([...local]);
    }
    
  }, [data])
  
  const handleChange = (collIndex) => (checked) => {
    data[collIndex].visible = checked;
    setData([...data])
  }

  return (
    <>   
        {!data && (
            <>
                <BaseHeaderLayout
                    title="Storage plugin"
                    subtitle="Это ваш склад, управлять им так же легко как нажать большую красную кнопку."
                    as="h2"
                    primaryAction={<LoadFromExcelButton setDataState={setData}>Добавить из excel файла</LoadFromExcelButton>}
                />
                <EmptyStateLayout icon={<Stack />} content="На данный момент склад пуст" />
            </>
        )}
        {data && data.length && (
            <>
                <BaseHeaderLayout
                    title="Storage plugin"
                    subtitle="Это ваш склад, управлять им так же легко как нажать большую красную кнопку."
                    as="h2"
                    primaryAction={<LoadFromExcelButton setDataState={setData}>Добавить из excel файла</LoadFromExcelButton>}
                />
                <ContentLayout>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox aria-label="Select all entries" />
                                </Th>
                                {data.map((e, i) => {
                                    if(e && e.visible || isTableOptions)
                                        return(
                                            isTableOptions ? 
                                            <Th key={i}>
                                                <CustomCheckbox
                                                    handleChange={handleChange(i)}
                                                    checkedModificator={e.visible}
                                                >
                                                    <Typography variant="sigma">{e.name}</Typography>
                                                </CustomCheckbox>
                                            </Th>
                                            :
                                            <Th>
                                                <Typography variant="sigma">{e.name}</Typography>
                                            </Th>
                                        )
                                })}
                                <Th>
                                    {!isTableOptions ? <Button onClick={() => setIsTableOptions(!isTableOptions)}>Настроить</Button> : <Button onClick={() => setIsTableOptions(!isTableOptions)}>сохранить</Button>}
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rows && rows.map((e, i) => 
                                <Tr key={i}>
                                    <Td>
                                        <Checkbox aria-label={`Select ${1}`} />
                                    </Td>
                                        {e.map(row => {
                                            if(row.visible || isTableOptions)
                                                return (
                                                    <Td>
                                                        <Typography textColor="neutral800">{row.data}</Typography>
                                                    </Td>
                                                )
                                        })}
                                        
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
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </ContentLayout>
            </>
        )}
    </>
            
  );
};

export default memo(Storage);