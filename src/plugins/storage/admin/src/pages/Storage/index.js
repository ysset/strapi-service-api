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
  ContentLayout,
  Button,
} from '@strapi/design-system';
import { Stack, Pencil, Trash} from '@strapi/icons'
import CustomCheckbox from '../../components/Checkbox'

const Storage = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [storageList, setStorageList] = useState(null);
  const [collums, setCollums] = useState(
    [
        {
            name: 'Наименование товара',
            data: ['Двигатель','Двигатель',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Новый/БУ',
            data: ['БУ','БУ',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Марка',
            data: ['Subaru','Subaru',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Модель',
            data: ['Legacy','Legacy',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Кузов',
            data: ['BH5/BE5','BH5/BE5',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Номер',
            data: ['704192','704192',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Двигатель',
            data: ['ej208','ej208',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Год',
            data: ['2001-2002','2001-2002',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'L/R',
            data: [null,null,],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'F/R',
            data: [null,null,],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Цвет',
            data: [null,null,],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Примечание',
            data: ['2 модель/АТ','2 модель/АТ',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Количество',
            data: ['1','1',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Наличие',
            data: ['В наличи','В наличи',],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Фотография',
            data: [null,null,],
            visible: true,
            optionslVisible: false
        },
        {
            name: 'Цена',
            data: ['125000', '125000'],
            visible: true,
            optionslVisible: false
        },
    ]
    );
  const [rows, setRows] = useState(null);

  useEffect(() => {
    console.log(collums);
  }, [collums])

  useEffect(() => {
    storageListRequet.getList()
    .then(res => {
        setStorageList(res);
    })
    .catch(e => {
      console.log(e);
    });
  }, [setStorageList]);


  useEffect(() => {
    const local = []
    for(let i = 0; i <= collums[0].data.length - 1; i++) {
          local.push(collums.map(e => {
              return {
                  visible: e.visible,
                  data: e.data[i]
              }
          }))
    }
    console.log(local);
    
    setRows([...local]);
  }, [collums])
  
  const handleChange = (collIndex) => (checked) => {
    collums[collIndex].visible = checked;
    setCollums([...collums])
  }

  return (
    <>   
        {!storageList && (
            <EmptyStateLayout icon={<Stack />} content="На данный момент склад пуст" />
        )}
        {storageList && storageList.length && (
            <>
                <BaseHeaderLayout
                    title="Storage plugin"
                    subtitle="Это ваш склад, управлять им так же легко как нажать большую красную кнопку."
                    as="h2"
                    //TODO кнопка загрузки  таблицыe
                    primaryAction={<Button>Добавить из excel файла</Button>}
                />
                <ContentLayout>
                    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox aria-label="Select all entries" />
                                </Th>
                                {collums.map((e, i) => {
                                    if(e.visible)
                                        return(
                                            <Th>
                                                <CustomCheckbox
                                                    handleChange={handleChange(i)}
                                                >
                                                    <Typography variant="sigma">{e.name}</Typography>
                                                </CustomCheckbox>
                                            </Th>
                                        )
                                })}
                                <Th>
                                    <Button>Настроить</Button>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {rows.map((e, i) => 
                            <Tr key={i}>
                                <Td>
                                    <Checkbox aria-label={`Select ${1}`} />
                                </Td>
                                    {e.map(row => {
                                        if(row.visible)
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