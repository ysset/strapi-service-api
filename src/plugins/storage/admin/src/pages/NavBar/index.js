// admin/src/pages/Homepage/index.js
/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { 
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavLink,
  SubNavSection,
} from '@strapi/design-system';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const links = [
        {
            id: 1,
            label: 'Storage',
            href: '/plugins/storage'
        },
        {
            id: 2,
            label: 'Load storage from Excel',
            href: '/plugins/storage/load'
        }
    ];

  return (
    <SubNav aria-label="Settings sub nav">
        <SubNavHeader label="Storage" />
        <SubNavSections>
        <SubNavSection label="Global Settings">
            {
            links.map(link => <SubNavLink tag={NavLink} to={link.href} active={link.active} icon={link.icon} key={link.id}>
                {link.label}
            </SubNavLink>)
            }
        </SubNavSection>
        </SubNavSections>
    </SubNav>
  );
};

export default memo(NavBar);