import React, { useState, useEffect, Component, Fragment } from 'react';
import { Container, Header, Icon, List } from 'semantic-ui-react'
import './styles.css';
import axios from 'axios'
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])
  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        console.log(response);
        setActivities(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};


export default App;