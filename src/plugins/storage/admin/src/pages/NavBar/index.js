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

    const links = [{
        id: 1,
        label: 'Storage',
        href: '/plugins/storage'
      }, {
        id: 2,
        label: 'Categories',
        href: '/plugins/'
      }, {
        id: 3,
        label: 'Cities',
        href: '/plugins/',
        active: true
      }, {
        id: 4,
        label: 'Countries',
        href: '/plugins/'
      }];

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