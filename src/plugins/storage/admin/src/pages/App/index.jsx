// admin/src/pages/Homepage/index.js
/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';

import { storageListRequet } from '../../api/storage.js';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';

import { Stack } from '@strapi/icons'

const HomePage = () => {
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

  return (
    <>
      <BaseHeaderLayout
        title="Storage plugin"
        subtitle="Это ваш склад, управлять им так же легко как нажать большую красную кнопку."
        as="h2"
      />
      <ContentLayout>
        {taskCount === 0 && (
          <EmptyStateLayout icon={<Stack />} content="На данный момент склад пуст" />
        )}
        {taskCount > 0 && (
          <Box background="neutral0" hasRadius={true} shadow="filterShadow">
            <Flex justifyContent="center" padding={8}>
              <Typography variant="alpha">You have a total of {taskCount} tasks 🚀</Typography>
            </Flex>
          </Box>
        )}
      </ContentLayout>
    </>
  );
};

export default memo(HomePage);
