import React, { FormEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from "../../../app/models/activity";
import { create } from "domain";
import { act } from "react-dom/test-utils";
import { v4 as uuid } from "uuid"

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({ createActivity, editActivity, setEditMode, activity: initialFormState, submitting }) => {
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                category: '',
                city: '',
                date: '',
                description: '',
                venue: ''
            }
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else {
            editActivity(activity);
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm)
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} rows={2} name='description' placeholder='Description'
                    value={activity.description} />
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category'
                    value={activity.category} />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date'
                    value={activity.date} />
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city} />
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' onClick={() => setEditMode(false)} type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
