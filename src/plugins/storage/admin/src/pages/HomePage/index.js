/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import Storage from '../Storage';
import NavBar from '../NavBar';

const App = () => {
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
            paddingTop: 0
          }}>
            <NavBar/>
          </div>
          <div style={{
            overflowY: 'auto',
            width: '100%'
          }}>
            <div style={{
              marginLeft: '3vh',
              marginRight: '3vh'
            }}>
              <Switch>
                <Route path={`/plugins/${pluginId}`} component={Storage} exact/>
                <Route path={`/plugins/${pluginId}/load`} component={Storage} exact/>
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
