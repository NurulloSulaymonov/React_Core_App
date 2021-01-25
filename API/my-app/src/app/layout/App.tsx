import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import './styles.css';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from "./LoadingComponent";


const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');
    
    const handleSelectedActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
        setEditMode(false);
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false))
    }

    const handleEditActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.update(activity).then(() => {
            setActivities([...activities.filter(x => x.id != activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false))
    }

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        console.log(id);
        setSubmitting(true);
        setTarget(event.currentTarget.name)
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(a => a.id !== id)])
        }).then(() => setSubmitting(false))
    }

    useEffect(() => {
        agent.Activities.list()
            .then((response) => {
                if (activities && activities.length === 0) {
                    let activities: IActivity[] = [];
                    response.forEach(act => {
                        act.date = act.date.split('.')[0]
                        activities.push(act);
                    })
                    setActivities(activities)
                }
            }).then(() => setLoading(false))
    }, [activities]);


    if (loading) return <LoadingComponent content='Loading activities' />
    return (
        <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard activities={activities}
                    selectActivity={handleSelectedActivity}
                    selectedActivity={selectedActivity}
                    setSelectedActivity={setSelectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Container>
        </Fragment>

    );
};
export default App;